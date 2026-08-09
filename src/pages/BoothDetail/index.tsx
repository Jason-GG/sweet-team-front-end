import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowLeft,
  Image as ImageIcon,
  MessageSquareMore,
  Send,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { fetchBooths } from '../../features/booths/api/boothsApi'
import OfficialBadge from '../../features/booths/components/OfficialBadge'
import type { Booth } from '../../features/booths/types'

type ThemeBlock =
  | {
      id: string
      type: 'text'
      title: string
      body: string
    }
  | {
      id: string
      type: 'image'
      title: string
      body: string
      mediaUrl: string
      alt: string
    }
  | {
      id: string
      type: 'video'
      title: string
      body: string
      mediaUrl: string
      posterUrl: string
    }

type MessageAttachment = {
  id: string
  kind: 'image' | 'video'
  name: string
  previewUrl: string
  file?: File
}

type BoothMessage = {
  id: string
  author: string
  postedAt: string
  text: string
  attachments: MessageAttachment[]
  accentTone: string
}

function BoothDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [booth, setBooth] = useState<Booth | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<BoothMessage[]>([])
  const [draftMessage, setDraftMessage] = useState('')
  const [draftAttachments, setDraftAttachments] = useState<MessageAttachment[]>([])
  const cleanupUrlsRef = useRef<string[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadBooth() {
      setIsLoading(true)
      setError(null)

      try {
        const booths = await fetchBooths()
        const matchedBooth = booths.find((item) => item.slug === slug)

        if (cancelled) {
          return
        }

        if (!matchedBooth) {
          setError('We could not find that booth.')
          setBooth(null)
          setMessages([])
          return
        }

        setBooth(matchedBooth)
        setMessages(createStarterMessages(matchedBooth))
      } catch {
        if (!cancelled) {
          setError('Unable to load the booth right now.')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadBooth()

    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    return () => {
      cleanupUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const accent = booth ? getBoothAccent(booth) : defaultAccent
  const themeBlocks = useMemo(() => (booth ? createThemeBlocks(booth) : []), [booth])

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length === 0) {
      return
    }

    const nextAttachments = selectedFiles
      .filter((file) => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map((file) => {
        const previewUrl = URL.createObjectURL(file)
        cleanupUrlsRef.current.push(previewUrl)

        return {
          id: `${file.name}-${file.size}-${previewUrl}`,
          kind: file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name,
          previewUrl,
          file,
        } satisfies MessageAttachment
      })

    setDraftAttachments((current) => [...current, ...nextAttachments])
    event.target.value = ''
  }

  function handleRemoveAttachment(attachmentId: string) {
    setDraftAttachments((current) => {
      const target = current.find((attachment) => attachment.id === attachmentId)

      if (target?.file) {
        URL.revokeObjectURL(target.previewUrl)
        cleanupUrlsRef.current = cleanupUrlsRef.current.filter((url) => url !== target.previewUrl)
      }

      return current.filter((attachment) => attachment.id !== attachmentId)
    })
  }

  function handleSubmitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedMessage = draftMessage.trim()

    if (!trimmedMessage && draftAttachments.length === 0) {
      return
    }

    const postedMessage: BoothMessage = {
      id: `message-${Date.now()}`,
      author: 'You',
      postedAt: 'Just now',
      text: trimmedMessage,
      attachments: draftAttachments,
      accentTone: accent.tagBgClass,
    }

    setMessages((current) => [postedMessage, ...current])
    setDraftMessage('')
    setDraftAttachments([])
  }

  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-[var(--color-line)] bg-white/80 p-8 shadow-[var(--shadow-card)]">
        <p className="text-sm text-slate-600">Loading booth details...</p>
      </section>
    )
  }

  if (error || !booth) {
    return (
      <section className="space-y-5 rounded-[28px] border border-rose-200 bg-white/90 p-8 shadow-[var(--shadow-card)]">
        <p className="text-sm font-medium text-rose-700">{error ?? 'We could not find that booth.'}</p>
        <Link
          to="/booths"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft className="size-4" />
          Back to booths
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-8">
      <section
        className={`relative overflow-hidden rounded-[34px] border ${accent.borderClass} bg-white/95 p-7 shadow-[var(--shadow-card)] sm:p-9`}
      >
        <div className={`absolute inset-x-0 top-0 h-2 ${accent.barClass}`} />
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0)_72%)]" />

        <div className="relative space-y-6">
          <Link
            to="/booths"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="size-4" />
            Back to booths
          </Link>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                  {booth.category}
                </span>
                {booth.isOfficial ? <OfficialBadge /> : null}
                <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1 text-xs font-medium text-slate-500">
                  <Sparkles className="size-3.5" />
                  Visual storytelling booth
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl font-display text-4xl tracking-[-0.04em] text-slate-900 sm:text-5xl">
                {booth.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {booth.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  <Users className="size-4 text-slate-400" />
                  {booth.groupCount} active groups
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  <MessageSquareMore className="size-4 text-slate-400" />
                  Open wall for text, images, and video
                </div>
              </div>
            </div>

            <aside className={`rounded-[28px] border ${accent.softBorderClass} ${accent.softPanelClass} p-6`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Booth theme</p>
              <h2 className="mt-3 font-display text-3xl text-slate-900">{createThemeHeadline(booth)}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Share a quick thought, drop a picture from your day, or upload a short video that helps others see what worked for you.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div className="rounded-[22px] border border-white/70 bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Theme</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">Title + story</p>
                </div>
                <div className="rounded-[22px] border border-white/70 bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Photo</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">Food, routine, study spot</p>
                </div>
                <div className="rounded-[22px] border border-white/70 bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Video</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">Short walkthroughs and tips</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.15fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[30px] border border-[var(--color-line)] bg-white/90 p-6 shadow-[var(--shadow-card)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Theme gallery</p>
                <h2 className="mt-2 font-display text-3xl text-slate-900">A booth can mix words, pictures, and video</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {themeBlocks.map((block) => (
                <article
                  key={block.id}
                  className={`overflow-hidden rounded-[24px] border ${accent.softBorderClass} bg-[linear-gradient(180deg,#ffffff_0%,#fbf8fd_100%)]`}
                >
                  <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{block.type}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-900">{block.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{block.body}</p>
                    </div>

                    {block.type === 'text' ? (
                      <div className={`m-6 flex min-h-52 items-end rounded-[22px] ${accent.mediaBgClass} p-5`}>
                        <p className="max-w-xs text-sm leading-7 text-slate-700">
                          Every booth theme starts with a title, then grows with practical stories from the community.
                        </p>
                      </div>
                    ) : null}

                    {block.type === 'image' ? (
                      <div className="p-6 pt-0 lg:p-6">
                        <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white shadow-sm">
                          <img src={block.mediaUrl} alt={block.alt} className="h-72 w-full object-cover" />
                        </div>
                      </div>
                    ) : null}

                    {block.type === 'video' ? (
                      <div className="p-6 pt-0 lg:p-6">
                        <div className="overflow-hidden rounded-[22px] border border-white/70 bg-slate-950 shadow-sm">
                          <video
                            controls
                            preload="metadata"
                            poster={block.posterUrl}
                            className="h-72 w-full object-cover"
                            src={block.mediaUrl}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[30px] border border-[var(--color-line)] bg-white/90 p-6 shadow-[var(--shadow-card)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Leave a message</p>
            <h2 className="mt-2 font-display text-3xl text-slate-900">Post text, photos, or video to the booth wall</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Start a conversation with a short update, then attach an image or video if you want to show context.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmitMessage}>
              <div className="overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[#fcfbfd]">
                <textarea
                  value={draftMessage}
                  onChange={(event) => setDraftMessage(event.target.value)}
                  rows={5}
                  placeholder="What do you want to share in this booth today?"
                  className="w-full resize-none border-0 bg-transparent px-5 py-4 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className={`inline-flex cursor-pointer items-center gap-2 rounded-full border ${accent.softBorderClass} ${accent.softPanelClass} px-4 py-2 text-sm font-semibold text-slate-700`}>
                  <ImageIcon className="size-4" />
                  Add image or video
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    onChange={handleAttachmentChange}
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <Send className="size-4" />
                  Post message
                </button>
              </div>

              {draftAttachments.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {draftAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-white"
                    >
                      {attachment.kind === 'image' ? (
                        <img src={attachment.previewUrl} alt={attachment.name} className="h-44 w-full object-cover" />
                      ) : (
                        <video src={attachment.previewUrl} controls className="h-44 w-full object-cover" />
                      )}
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="truncate text-sm font-medium text-slate-700">{attachment.name}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(attachment.id)}
                          className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </form>
          </section>

          <section className="rounded-[30px] border border-[var(--color-line)] bg-white/90 p-6 shadow-[var(--shadow-card)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Booth wall</p>
                <h2 className="mt-2 font-display text-3xl text-slate-900">Community messages</h2>
              </div>
              <div className="rounded-full border border-[var(--color-line)] bg-[#fcfbfd] px-4 py-2 text-sm font-semibold text-slate-500">
                {messages.length} posts
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="rounded-[24px] border border-[var(--color-line)] bg-[linear-gradient(180deg,#ffffff_0%,#fcfbfd_100%)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`flex size-11 items-center justify-center rounded-full ${message.accentTone} text-sm font-bold text-slate-800`}>
                          {message.author.slice(0, 1)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{message.author}</p>
                          <p className="text-xs text-slate-400">{message.postedAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {message.text ? <p className="mt-4 text-sm leading-7 text-slate-600">{message.text}</p> : null}

                  {message.attachments.length > 0 ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {message.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white"
                        >
                          {attachment.kind === 'image' ? (
                            <img src={attachment.previewUrl} alt={attachment.name} className="h-44 w-full object-cover" />
                          ) : (
                            <video src={attachment.previewUrl} controls className="h-44 w-full object-cover" />
                          )}
                          <div className="px-4 py-3 text-sm font-medium text-slate-700">{attachment.name}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

const defaultAccent = {
  barClass: 'bg-[#d7cfde]',
  borderClass: 'border-[var(--color-line)]',
  softBorderClass: 'border-[#ede6f3]',
  softPanelClass: 'bg-[#f7f2fb]',
  tagBgClass: 'bg-[#eee8f5]',
  tagTextClass: 'text-[#5f5370]',
  mediaBgClass: 'bg-[linear-gradient(135deg,#f7f2fb_0%,#efe7f9_100%)]',
}

function getBoothAccent(booth: Booth) {
  if (booth.isOfficial && booth.category === 'School Life') {
    return {
      barClass: 'bg-[#5c9af6]',
      borderClass: 'border-[#d9e6fb]',
      softBorderClass: 'border-[#d7e8fd]',
      softPanelClass: 'bg-[#eff6ff]',
      tagBgClass: 'bg-[#dbeafe]',
      tagTextClass: 'text-[#24579f]',
      mediaBgClass: 'bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_100%)]',
    }
  }

  if (booth.category === 'Meals') {
    return {
      barClass: 'bg-[#38cf74]',
      borderClass: 'border-[#d7f1e2]',
      softBorderClass: 'border-[#d8f5e2]',
      softPanelClass: 'bg-[#edfdf2]',
      tagBgClass: 'bg-[#dcfce7]',
      tagTextClass: 'text-[#17653a]',
      mediaBgClass: 'bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)]',
    }
  }

  if (booth.category === 'Medical Care') {
    return {
      barClass: 'bg-[#33c9e7]',
      borderClass: 'border-[#d6f2f8]',
      softBorderClass: 'border-[#d5f3f8]',
      softPanelClass: 'bg-[#effcff]',
      tagBgClass: 'bg-[#dff7fd]',
      tagTextClass: 'text-[#116377]',
      mediaBgClass: 'bg-[linear-gradient(135deg,#ecfeff_0%,#cffafe_100%)]',
    }
  }

  return {
    barClass: 'bg-[#f25bad]',
    borderClass: 'border-[#f5d9e8]',
    softBorderClass: 'border-[#f8dceb]',
    softPanelClass: 'bg-[#fff1f8]',
    tagBgClass: 'bg-[#fce7f3]',
    tagTextClass: 'text-[#9f2f68]',
    mediaBgClass: 'bg-[linear-gradient(135deg,#fdf2f8_0%,#fce7f3_100%)]',
  }
}

function createThemeHeadline(booth: Booth) {
  switch (booth.category) {
    case 'Meals':
      return 'Show what practical meal support looks like'
    case 'School Life':
      return 'Make daily school routines visible and easier'
    case 'Medical Care':
      return 'Turn care experience into shared confidence'
    default:
      return 'Collect lived experience around one clear topic'
  }
}

function createThemeBlocks(booth: Booth): ThemeBlock[] {
  return [
    {
      id: `${booth.id}-theme-text`,
      type: 'text',
      title: `${booth.title} starts with a clear topic`,
      body: `Use the booth title to anchor the conversation, then let people add lived experience, practical advice, and small wins around ${booth.category.toLowerCase()}.`,
    },
    {
      id: `${booth.id}-theme-image`,
      type: 'image',
      title: 'Pictures make the advice easier to understand',
      body: 'A meal photo, study setup, checklist, or kit layout can explain context faster than a long post and helps the booth feel lived in.',
      mediaUrl:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
      alt: 'A bright table with healthy food and a notebook.',
    },
    {
      id: `${booth.id}-theme-video`,
      type: 'video',
      title: 'Short video can demonstrate routines in seconds',
      body: 'Record a quick walkthrough, prep sequence, or daily routine so new members can see what worked in a real setting.',
      mediaUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      posterUrl:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    },
  ]
}

function createStarterMessages(booth: Booth): BoothMessage[] {
  const accent = getBoothAccent(booth)

  return [
    {
      id: `${booth.id}-starter-1`,
      author: booth.isOfficial ? 'Moderator' : 'Community member',
      postedAt: '2h ago',
      text: `Welcome to ${booth.title}. Feel free to post a note, a photo, or a short video if it helps explain your experience.`,
      attachments: [],
      accentTone: accent.tagBgClass,
    },
    {
      id: `${booth.id}-starter-2`,
      author: 'Mina',
      postedAt: '45m ago',
      text: 'I like that this booth keeps examples practical. Seeing what other people actually do during the day makes the advice easier to try.',
      attachments: [
        {
          id: `${booth.id}-starter-2-image`,
          kind: 'image',
          name: 'study-routine.jpg',
          previewUrl:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        },
      ],
      accentTone: accent.tagBgClass,
    },
    {
      id: `${booth.id}-starter-3`,
      author: 'Akari',
      postedAt: '12m ago',
      text: 'Here is a short clip from my setup this week. It helped me stay consistent when my schedule got busy.',
      attachments: [
        {
          id: `${booth.id}-starter-3-video`,
          kind: 'video',
          name: 'daily-setup.mp4',
          previewUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        },
      ],
      accentTone: accent.tagBgClass,
    },
  ]
}

export default BoothDetailPage