import { useState, type FormEvent } from 'react'
import { ArrowLeft, Heart, Lock, MessageSquareMore, Send, Users, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import type { BoothCategory } from '../../features/booths/types'
import { useGroups } from '../../features/groups/hooks/useGroups'
import type { GroupCard } from '../../features/groups/types'
import { useI18n } from '../../lib/i18n'

type GroupPost = {
  id: string
  author: string
  postedAt: string
  text: string
  imageUrl?: string
  likes: number
  isLiked?: boolean
  comments: string[]
}

function getAccent(category: BoothCategory) {
  if (category === 'School Life') {
    return {
      barClass: 'bg-[#5c9af6]',
      borderClass: 'border-[#d9e6fb]',
      tagBgClass: 'bg-[#dbeafe]',
      tagTextClass: 'text-[#24579f]',
      avatarClass: 'bg-[#dbeafe]',
    }
  }

  if (category === 'Meals') {
    return {
      barClass: 'bg-[#38cf74]',
      borderClass: 'border-[#d7f1e2]',
      tagBgClass: 'bg-[#dcfce7]',
      tagTextClass: 'text-[#17653a]',
      avatarClass: 'bg-[#dcfce7]',
    }
  }

  return {
    barClass: 'bg-[#f25bad]',
    borderClass: 'border-[#f5d9e8]',
    tagBgClass: 'bg-[#fce7f3]',
    tagTextClass: 'text-[#9f2f68]',
    avatarClass: 'bg-[#fce7f3]',
  }
}

function createStarterPosts(group: GroupCard): GroupPost[] {
  return [
    {
      id: `${group.id}-starter-1`,
      author: 'Community member',
      postedAt: '2h ago',
      text: `Welcome to ${group.name}. Feel free to share a note, a photo, or a question for the group.`,
      likes: 12,
      comments: [
        'Thanks for the warm welcome!',
        'Happy to be here.',
        'Looking forward to sharing more.',
      ],
    },
    {
      id: `${group.id}-starter-2`,
      author: 'Mina',
      postedAt: '45m ago',
      text: 'I found this group helpful because everyone shares practical details instead of only general advice.',
      imageUrl:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      likes: 8,
      comments: ['This is really helpful, thanks for sharing.'],
    },
    {
      id: `${group.id}-starter-3`,
      author: 'Akari',
      postedAt: '12m ago',
      text: 'Here is a small routine that worked for me this week.',
      likes: 5,
      comments: [],
    },
  ]
}

function GroupDetailPage() {
  const t = useI18n()
  const { groupId } = useParams<{ groupId: string }>()
  const { groups } = useGroups()
  const group = groups.find((item) => item.id === groupId)
  const [draft, setDraft] = useState('')
  const [posts, setPosts] = useState<GroupPost[]>(() =>
    group ? createStarterPosts(group) : []
  )
  const [commentTargetId, setCommentTargetId] = useState<string | null>(null)
  const [commentDraft, setCommentDraft] = useState('')

  const commentTarget = posts.find((post) => post.id === commentTargetId) ?? null

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedDraft = draft.trim()

    if (!trimmedDraft) {
      return
    }

    setPosts((currentPosts) => [
      {
        id: `post-${Date.now()}`,
        author: 'You',
        postedAt: 'Just now',
        text: trimmedDraft,
        likes: 0,
        isLiked: false,
        comments: [],
      },
      ...currentPosts,
    ])
    setDraft('')
  }

  function toggleLike(postId: string) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post
        }

        const isLiked = !post.isLiked
        return {
          ...post,
          isLiked,
          likes: post.likes + (isLiked ? 1 : -1),
        }
      })
    )
  }

  function openComments(postId: string) {
    setCommentTargetId(postId)
    setCommentDraft('')
  }

  function closeComments() {
    setCommentTargetId(null)
    setCommentDraft('')
  }

  function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedComment = commentDraft.trim()

    if (!trimmedComment || !commentTargetId) {
      return
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === commentTargetId
          ? {
              ...post,
              comments: [...post.comments, `You: ${trimmedComment}`],
            }
          : post
      )
    )
    setCommentDraft('')
  }

  if (!group) {
    return (
      <section className="space-y-5 rounded-[28px] border border-rose-200 bg-white/90 p-8 shadow-sm">
        <p className="text-sm font-medium text-rose-700">We could not find that group.</p>
        <Link
          to="/community"
          className="inline-flex items-center gap-2 rounded-full border border-[#e7dfea] bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          <ArrowLeft className="size-4" />
          {t.errorPage.goBack}
        </Link>
      </section>
    )
  }

  const accent = getAccent(group.category)

  return (
    <div className="space-y-8">
      <section
        className={`relative overflow-hidden rounded-[32px] border ${accent.borderClass} bg-white/95 p-7 shadow-[0_10px_28px_rgba(75,58,98,0.08)] sm:p-9`}
      >
        <div className={`absolute inset-x-0 top-0 h-2 ${accent.barClass}`} />

        <div className="relative space-y-6">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
          >
            <ArrowLeft className="size-4" />
            {t.errorPage.goBack}
          </Link>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                  {t.booths.categories[group.category]}
                </span>
                {group.isPrivate ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ead7fb] bg-[#f7f0ff] px-3 py-1 text-xs font-semibold text-[#8e54d6]">
                    <Lock className="size-3.5" />
                    {t.groups.private}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-slate-900 sm:text-5xl">
                {group.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dfea] bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  <Users className="size-4 text-slate-400" />
                  {t.groups.members(group.currentMembers, group.capacity)}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dfea] bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  <MessageSquareMore className="size-4 text-slate-400" />
                  {group.boothTitle}
                </div>
              </div>
            </div>

            <aside className="rounded-[26px] border border-white/70 bg-[#fbf8fd] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {t.groups.title}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">{group.boothTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {group.description || t.groups.subtitle}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {group.id === 'recording-menstrual-cycles' ? (
      <section className="rounded-[30px] border border-[#e7dfea] bg-white/90 p-6 shadow-sm sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Group guide</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Chapters</h2>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <article className="rounded-[22px] border border-[#e7dfea] bg-[#fcfbfd] p-5">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                Chapter 1
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Track your cycle and glucose together</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Record the date, symptoms, and blood sugar trend in one place. Seeing the two side by side makes patterns and timing easier to understand.
              </p>
            </article>

            <article className="rounded-[22px] border border-[#e7dfea] bg-[#fcfbfd] p-5">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                Chapter 2
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">Share what changed, not just the numbers</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Add a short note about meals, sleep, stress, or medication. A little context helps the group give more useful and kind feedback.
              </p>
            </article>
          </div>

          <div className="space-y-5">
            <article className="overflow-hidden rounded-[22px] border border-[#e7dfea] bg-white">
              <div className="p-5">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                  Photo
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">Photo diary</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  A picture of a meal, a chart, or a daily routine can explain context faster than a long post.
                </p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
                alt="A bright table with healthy food and a notebook."
                className="aspect-video w-full object-cover"
              />
            </article>

            <article className="overflow-hidden rounded-[22px] border border-[#e7dfea] bg-white">
              <div className="p-5">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent.tagBgClass} ${accent.tagTextClass}`}>
                  Video
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">Video walkthrough</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Watch a short clip to see how someone else records and reviews their daily notes.
                </p>
              </div>
              <video
                controls
                preload="metadata"
                poster="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
                className="aspect-video w-full object-cover"
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              />
            </article>
          </div>
        </div>
      </section>
      ) : null}

      <section className="grid gap-8 xl:grid-cols-[1.15fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[30px] border border-[#e7dfea] bg-white/90 p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {t.community.wallTitle}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{t.community.wallTitle}</h2>

            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-[24px] border border-[#e7dfea] bg-[linear-gradient(180deg,#ffffff_0%,#fcfbfd_100%)] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex size-11 items-center justify-center rounded-full ${accent.avatarClass} text-sm font-bold text-slate-800`}>
                      {post.author.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                      <p className="text-xs text-slate-400">{post.postedAt}</p>
                    </div>
                  </div>

                  {post.text ? <p className="mt-4 text-sm leading-7 text-slate-600">{post.text}</p> : null}

                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.text}
                      className="mt-4 h-56 w-full rounded-[20px] border border-[#e7dfea] object-cover"
                    />
                  ) : null}

                  <div className="mt-4 flex items-center gap-5 text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 transition-colors ${
                        post.isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`size-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                      {post.likes}
                    </button>
                    <button
                      type="button"
                      onClick={() => openComments(post.id)}
                      className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-[#8f58de]"
                    >
                      <MessageSquareMore className="size-4" />
                      {post.comments.length}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[30px] border border-[#e7dfea] bg-white/90 p-6 shadow-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              {t.community.post}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{t.community.post}</h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={5}
                placeholder={t.community.postPlaceholder}
                className="w-full resize-none rounded-[22px] border border-[#e7dfea] bg-[#fcfbfd] px-5 py-4 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#d5c0e8] focus:ring-2 focus:ring-[#f3e9fc]"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <Send className="size-4" />
                {t.community.post}
              </button>
            </form>
          </section>
        </div>
      </section>

      {commentTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-[2px]">
          <div className="w-full max-w-[560px] rounded-[22px] bg-white p-6 shadow-[0_26px_60px_rgba(24,20,42,0.28)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {commentTarget.author}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Comments</h2>
              </div>
              <button
                type="button"
                onClick={closeComments}
                className="rounded-full p-1 text-[#777d8c] transition-colors hover:bg-[#f4f0f6] hover:text-[#444d5d]"
                aria-label="Close comments"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 max-h-[320px] space-y-3 overflow-y-auto pr-1">
              {commentTarget.comments.length > 0 ? (
                commentTarget.comments.map((comment, index) => (
                  <div
                    key={`${commentTarget.id}-comment-${index}`}
                    className="rounded-[16px] border border-[#e7dfea] bg-[#fcfbfd] px-4 py-3 text-sm leading-6 text-slate-600"
                  >
                    {comment}
                  </div>
                ))
              ) : (
                <p className="rounded-[16px] border border-dashed border-[#e7dfea] px-4 py-6 text-sm text-slate-500">
                  No comments yet.
                </p>
              )}
            </div>

            <form className="mt-5 flex items-end gap-3" onSubmit={submitComment}>
              <label className="flex-1">
                <span className="sr-only">Add a comment</span>
                <input
                  type="text"
                  value={commentDraft}
                  onChange={(event) => setCommentDraft(event.target.value)}
                  placeholder="Write a comment..."
                  className="h-11 w-full rounded-[12px] border border-[#e7dfea] bg-[#fcfbfd] px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#d5c0e8] focus:ring-2 focus:ring-[#f3e9fc]"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-slate-900 px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <Send className="size-4" />
                Comment
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default GroupDetailPage
