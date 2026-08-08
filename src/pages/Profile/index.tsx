import { Globe, Save, Sparkles, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import SelectBox, { type SelectOption } from '../../components/ui/SelectBox'
import { supportedLanguageDetails, supportedLanguages, useI18n, useLanguage } from '../../lib/i18n'
import { cn } from '../../lib/utils'

type LanguageOption = {
  code: keyof typeof supportedLanguageDetails
  label: string
  nativeLabel: string
  flag: string
}

type AvatarTone = {
  id: string
  label: string
  swatchClassName: string
  ringClassName: string
  avatarClassName: string
}

const languageOptions: LanguageOption[] = supportedLanguages.map((code) => ({
  code,
  ...supportedLanguageDetails[code],
}))

const avatarTones: AvatarTone[] = [
  {
    id: 'lavender',
    label: 'lavender',
    swatchClassName: 'from-[#caa0ff] to-[#b57af4] text-white',
    ringClassName: 'border-[#a85cf5] ring-4 ring-[#f1dcff]',
    avatarClassName: 'from-[#d6b0ff] to-[#b87bf5] text-white',
  },
  {
    id: 'peach',
    label: 'Peach',
    swatchClassName: 'from-[#ffb3ba] to-[#ff949d] text-white',
    ringClassName: 'border-[#ff8d96] ring-4 ring-[#ffe2e5]',
    avatarClassName: 'from-[#ffc0c5] to-[#ff9ea7] text-white',
  },
  {
    id: 'mint',
    label: 'Mint',
    swatchClassName: 'from-[#b3f1d3] to-[#8ce0c2] text-[#18594a]',
    ringClassName: 'border-[#62d0ab] ring-4 ring-[#dbf8ec]',
    avatarClassName: 'from-[#c5f5dd] to-[#8fe6c8] text-[#18594a]',
  },
  {
    id: 'sky',
    label: 'Sky',
    swatchClassName: 'from-[#c5e6ff] to-[#9ed0f4] text-[#1f5582]',
    ringClassName: 'border-[#7fc0ee] ring-4 ring-[#e3f4ff]',
    avatarClassName: 'from-[#d5eeff] to-[#9fd4f6] text-[#1f5582]',
  },
  {
    id: 'rose',
    label: 'Rose',
    swatchClassName: 'from-[#f7cdea] to-[#efb5dd] text-[#7f255f]',
    ringClassName: 'border-[#ea98cd] ring-4 ring-[#ffe5f4]',
    avatarClassName: 'from-[#f9dbef] to-[#efbbe2] text-[#7f255f]',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    swatchClassName: 'from-[#ffdca8] to-[#ffc97f] text-[#855414]',
    ringClassName: 'border-[#ffbf63] ring-4 ring-[#fff0d7]',
    avatarClassName: 'from-[#ffe4ba] to-[#ffcb86] text-[#855414]',
  },
]

function ProfilePage() {
  const t = useI18n()
  const { language, setLanguage } = useLanguage()
  const [nickname, setNickname] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [selectedTone, setSelectedTone] = useState('lavender')
  const [introduction, setIntroduction] = useState('')

  const ageGroups: Array<SelectOption> = [
    { value: 'Under 18', label: t.profile.ageGroups['Under 18'] },
    { value: '18-22', label: t.profile.ageGroups['18-22'] },
    { value: '23-29', label: t.profile.ageGroups['23-29'] },
    { value: '30-39', label: t.profile.ageGroups['30-39'] },
    { value: '40+', label: t.profile.ageGroups['40+'] },
  ]

  const activeLanguage =
    languageOptions.find((option) => option.code === language) ?? languageOptions[0]
  const activeTone = avatarTones.find((tone) => tone.id === selectedTone) ?? avatarTones[0]

  const previewName = useMemo(() => {
    const trimmedNickname = nickname.trim()

    if (trimmedNickname.length > 0) {
      return trimmedNickname
    }

    return t.profile.previewNameFallback
  }, [nickname, t.profile.previewNameFallback])

  const introductionRemaining = 300 - introduction.length
  const previewInitial = previewName.charAt(0).toUpperCase() || '?'

  return (
    <div className="mx-auto max-w-[1080px]">
      <section className="rounded-[34px] border border-white/70 bg-white/92 px-4 py-5 shadow-[0_30px_60px_rgba(107,76,140,0.12)] backdrop-blur sm:px-6 sm:py-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[760px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
              className={cn(
                'flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_14px_24px_rgba(193,109,227,0.28)]',
                activeTone.avatarClassName
              )}
            >
              <UserRound className="size-8" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#a24ee6] sm:text-[2.1rem]">
                {t.profile.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                {t.profile.subtitle}
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-7">
            <div className="space-y-2">
              <label htmlFor="nickname" className="block text-[1.05rem] font-semibold text-slate-900">
                {t.profile.nicknameLabel} <span className="text-[#f056af]">*</span>
              </label>
              <input
                id="nickname"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder={t.profile.nicknamePlaceholder}
                className="w-full rounded-[14px] border border-[#e6dff0] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#c783ff] focus:ring-4 focus:ring-[#f2e4ff]"
              />
              <p className="text-sm text-slate-500">{t.profile.nicknameHelp}</p>
            </div>

            <div className="space-y-2">
              <div className="block text-[1.05rem] font-semibold text-slate-900">
                {t.profile.ageGroupLabel} <span className="text-[#f056af]">*</span>
              </div>
              <SelectBox
                value={ageGroup}
                options={ageGroups}
                onChange={setAgeGroup}
                placeholder={t.profile.ageGroupPlaceholder}
                className="w-full"
                triggerClassName="h-auto rounded-[14px] border-[#e6dff0] px-4 py-3.5 text-slate-700 focus-visible:border-[#c783ff] focus-visible:ring-4 focus-visible:ring-[#f2e4ff]"
                dropdownClassName="rounded-[14px] border-[#e6dff0]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[1.05rem] font-semibold text-slate-900">
                <Globe className="size-4 text-[#a24ee6]" />
                <span>{t.profile.languageSettings}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {languageOptions.map((option) => {
                  const isActive = option.code === language

                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setLanguage(option.code)}
                      className={cn(
                        'relative rounded-[16px] border bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5',
                        isActive
                          ? 'border-[#a85cf5] shadow-[0_0_0_3px_rgba(233,214,255,0.8)]'
                          : 'border-[#e8e0ef] hover:border-[#d5c4e7]'
                      )}
                    >
                      {isActive ? (
                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#a85cf5] text-white shadow-[0_10px_18px_rgba(168,92,245,0.3)]">
                          <Sparkles className="size-3.5" />
                        </span>
                      ) : null}
                      <div className="text-3xl">{option.flag}</div>
                      <p className="mt-3 text-[15px] font-semibold text-slate-700">
                        {option.nativeLabel}
                      </p>
                    </button>
                  )
                })}
              </div>

              <p className="text-sm text-slate-500">
                {t.profile.selectedLanguage(activeLanguage.flag, activeLanguage.nativeLabel)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[1.05rem] font-semibold text-slate-900">
                <Sparkles className="size-4 text-[#a24ee6]" />
                <span>{t.profile.avatarColor}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {avatarTones.map((tone) => {
                  const isActive = tone.id === selectedTone

                  return (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => setSelectedTone(tone.id)}
                      className={cn(
                        'relative rounded-[18px] border bg-gradient-to-r px-4 py-4 text-sm font-semibold capitalize transition hover:-translate-y-0.5',
                        tone.swatchClassName,
                        isActive ? tone.ringClassName : 'border-transparent'
                      )}
                    >
                      {isActive ? (
                        <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#a85cf5] text-white shadow-[0_10px_18px_rgba(168,92,245,0.3)]">
                          <Sparkles className="size-3.5" />
                        </span>
                      ) : null}
                      {tone.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="introduction" className="block text-[1.05rem] font-semibold text-slate-900">
                {t.profile.selfIntroductionLabel}
              </label>
              <textarea
                id="introduction"
                maxLength={300}
                value={introduction}
                onChange={(event) => setIntroduction(event.target.value)}
                placeholder={t.profile.selfIntroductionPlaceholder}
                rows={5}
                className="w-full resize-none rounded-[16px] border border-[#e6dff0] bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition focus:border-[#c783ff] focus:ring-4 focus:ring-[#f2e4ff]"
              />
              <div className="text-right text-sm text-slate-500">{300 - introductionRemaining} / 300</div>
            </div>

            <section className="rounded-[24px] border border-[#f0ddfb] bg-gradient-to-br from-[#fbf5ff] to-[#fff7fb] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <Sparkles className="size-4 text-[#a24ee6]" />
                <span>{t.profile.preview}</span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <div
                  className={cn(
                    'flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold shadow-[0_10px_20px_rgba(166,122,212,0.24)]',
                    activeTone.avatarClassName
                  )}
                >
                  {previewInitial}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {previewName} <span className="text-xl">{activeLanguage.flag}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {ageGroup || t.profile.ageGroupPending}
                    {' • '}
                    {activeLanguage.nativeLabel}
                  </p>
                  {introduction.trim() ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                      {introduction.trim()}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-[14px] bg-gradient-to-r from-[#c192f7] to-[#f29ac8] px-6 py-4 text-lg font-semibold text-white shadow-[0_18px_28px_rgba(212,132,205,0.24)] transition hover:-translate-y-0.5"
            >
              <Save className="size-5" />
              {t.profile.saveProfile}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage