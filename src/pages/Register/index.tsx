import { Eye, EyeOff, Leaf, Lock, Mail, MapPin, ShieldCheck, UserRound } from 'lucide-react'
import { useState, type ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '../../lib/api/client'
import { registerAccount, requestVerificationCode, verifyVerificationCode } from '../../features/auth/api/authApi'
import { usePageHealthCheck } from '../../features/auth/hooks/usePageHealthCheck'
import type { RegisterPayload } from '../../features/auth/types'

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0]

type RegisterFormState = {
  email: string
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  displayName: string
  location: string
  profileFocus: string
  receiveUpdates: boolean
  nickname: string
  ageGroup: string
  language: string
  avatarColor: string
  selfIntroduction: string
}

const initialFormState: RegisterFormState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  displayName: '',
  location: '',
  profileFocus: 'I am looking for community resources',
  receiveUpdates: true,
  nickname: '',
  ageGroup: 'adult',
  language: 'English',
  avatarColor: 'Lavender',
  selfIntroduction: '',
}

const ageGroupOptions = [
  { label: 'Adult', value: 'adult' },
  { label: 'Teen', value: 'teen' },
  { label: 'Senior', value: 'senior' },
]

const languageOptions = ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Other']

const avatarColorOptions = ['Lavender', 'Coral', 'Sky', 'Mint', 'Sunflower']

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

function buildRegisterPayload(formState: RegisterFormState): RegisterPayload {
  return {
    email: formState.email.trim(),
    username: formState.username.trim(),
    password: formState.password,
    confirm_password: formState.confirmPassword,
    first_name: formState.firstName.trim(),
    last_name: formState.lastName.trim(),
    display_name: formState.displayName.trim(),
    location: formState.location.trim(),
    profile_focus: formState.profileFocus,
    receive_updates: formState.receiveUpdates,
    nickname: formState.nickname.trim(),
    age_group: formState.ageGroup,
    language: formState.language,
    avatar_color: formState.avatarColor,
    self_introduction: formState.selfIntroduction.trim(),
  }
}

function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formState, setFormState] = useState<RegisterFormState>(initialFormState)
  const [validationCode, setValidationCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [codeError, setCodeError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  usePageHealthCheck()

  const isValidEmailAddress = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const updateField = <K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSendValidationCode = async () => {
    const normalizedEmail = formState.email.trim()

    if (!isValidEmailAddress(normalizedEmail)) {
      setEmailVerified(false)
      setCodeSent(false)
      setEmailError('Please enter a valid email address before requesting a code.')
      setValidationMessage('')
      setCodeError('')
      setSubmitError('')
      return
    }

    setIsSendingCode(true)
    setEmailError('')
    setEmailVerified(false)
    setValidationCode('')
    setCodeError('')
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const response = await requestVerificationCode({ email: normalizedEmail })

      updateField('email', normalizedEmail)
      setCodeSent(true)
      setValidationMessage(
        response.message ?? `Validation code sent to ${normalizedEmail}. Enter the 6-digit code to continue.`,
      )
    } catch (error) {
      setCodeSent(false)
      setValidationMessage('')
      setEmailError(getErrorMessage(error, 'Unable to send a validation code right now.'))
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!codeSent) {
      setCodeError('Request a validation code first.')
      return
    }

    if (!/^\d{6}$/.test(validationCode.trim())) {
      setEmailVerified(false)
      setCodeError('Enter a valid 6-digit validation code.')
      return
    }

    setIsVerifyingCode(true)
    setCodeError('')
    setSubmitError('')

    try {
      const response = await verifyVerificationCode({
        email: formState.email.trim(),
        code: validationCode.trim(),
      })

      setEmailVerified(true)
      setValidationMessage(response.message ?? 'Email address verified. You can finish creating your account.')
    } catch (error) {
      setEmailVerified(false)
      setCodeError(getErrorMessage(error, 'Unable to verify the code right now.'))
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault()

    if (!emailVerified) {
      setCodeError('Verify your email address before creating your account.')
      setSubmitError('')
      return
    }

    const payload = buildRegisterPayload(formState)

    if (!payload.username || !payload.first_name || !payload.last_name) {
      setSubmitError('Username, first name, and last name are required.')
      return
    }

    if (!payload.password || !payload.confirm_password) {
      setSubmitError('Enter and confirm your password before creating your account.')
      return
    }

    if (payload.password !== payload.confirm_password) {
      setSubmitError('Password and confirm password must match.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const response = await registerAccount(payload)

      setSubmitSuccess(response.message ?? 'Account created successfully. You can sign in now.')
      navigate('/')
    } catch (error) {
      setSubmitError(getErrorMessage(error, 'Unable to create your account right now.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(240,86,175,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(162,78,230,0.18),_transparent_32%),linear-gradient(180deg,#fff9fc_0%,#f7f1fb_54%,#fdfcff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,255,255,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="rounded-[36px] border border-white/70 bg-white/72 p-8 shadow-[0_28px_90px_rgba(97,63,133,0.12)] backdrop-blur sm:p-10 lg:p-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(160,115,211,0.16)] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7d52b0] shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f589bf] to-[#a46af1] text-white shadow-[0_8px_18px_rgba(196,104,211,0.28)]">
              <Leaf className="size-4" />
            </span>
            SweetTea Register
          </div>

          <h1 className="mt-8 max-w-xl font-display text-5xl leading-tight text-slate-900 sm:text-6xl">
            Create your SweetTea account.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Register with your email, set your password, and add a few profile details so the app
            can tailor booths, groups, and guide recommendations to you.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['Email-based access', 'Use your own email address to sign up and manage your account.'],
              ['Profile setup', 'Add the basics now so your dashboard feels personal from the start.'],
              ['Local discovery', 'Help SweetTea surface nearby community spaces and support resources.'],
            ].map(([title, detail]) => (
              <article
                key={title}
                className="rounded-[24px] border border-[rgba(230,220,241,0.85)] bg-white/85 p-5 shadow-[0_14px_32px_rgba(103,76,134,0.08)]"
              >
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-[rgba(232,223,240,0.95)] bg-white p-7 shadow-[0_30px_80px_rgba(88,61,124,0.14)] sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-coral)]">
                Create profile
              </p>
              <h2 className="mt-3 font-display text-3xl text-slate-900">Register with email</h2>
            </div>
            <div className="rounded-full bg-[#fff4fa] px-3 py-1 text-xs font-semibold text-[#d64d98]">
              New account
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">First name</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <UserRound className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.firstName}
                    onChange={(event) => {
                      updateField('firstName', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Jamie"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Last name</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <UserRound className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.lastName}
                    onChange={(event) => {
                      updateField('lastName', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Lee"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
              <div className="space-y-3">
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <Mail className="size-4 text-[#a46af1]" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => {
                      updateField('email', event.target.value)
                      setEmailVerified(false)
                      setCodeSent(false)
                      setEmailError('')
                      setValidationMessage('')
                      setCodeError('')
                      setSubmitError('')
                      setSubmitSuccess('')
                    }}
                    placeholder="you@example.com"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleSendValidationCode}
                    disabled={isSendingCode}
                    className="inline-flex items-center justify-center rounded-2xl border border-[#d8c5ea] bg-[#f8f1fd] px-4 py-3 text-sm font-semibold text-[#8d46d7] transition-colors hover:bg-[#f3e9fc]"
                  >
                    {isSendingCode ? 'Sending...' : codeSent ? 'Resend validation code' : 'Send validation code'}
                  </button>

                  {emailVerified ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#edf9f2] px-3 py-1.5 text-sm font-semibold text-[#237a4c]">
                      <ShieldCheck className="size-4" />
                      Email verified
                    </span>
                  ) : null}
                </div>

                {emailError ? <p className="text-sm text-[#c94b74]">{emailError}</p> : null}
                {validationMessage ? <p className="text-sm text-slate-600">{validationMessage}</p> : null}
              </div>
            </label>

            {codeSent ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Validation code</span>
                <div className="space-y-3">
                  <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                    <ShieldCheck className="size-4 text-[#a46af1]" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={validationCode}
                      onChange={(event) => {
                        setValidationCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                        setCodeError('')
                      }}
                      placeholder="Enter 6-digit code"
                      className="w-full border-0 bg-transparent text-[15px] tracking-[0.3em] text-slate-900 outline-none placeholder:tracking-normal placeholder:text-slate-400"
                    />
                  </span>

                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isVerifyingCode}
                    className="inline-flex items-center justify-center rounded-2xl border border-[#d8c5ea] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#fbf8fe]"
                  >
                    {isVerifyingCode ? 'Verifying...' : 'Verify code'}
                  </button>

                  {codeError ? <p className="text-sm text-[#c94b74]">{codeError}</p> : null}
                </div>
              </label>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <Lock className="size-4 text-[#a46af1]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formState.password}
                    onChange={(event) => {
                      updateField('password', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Create a password"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="text-slate-400 transition-colors hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <Lock className="size-4 text-[#a46af1]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formState.confirmPassword}
                    onChange={(event) => {
                      updateField('confirmPassword', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Repeat your password"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="text-slate-400 transition-colors hover:text-slate-700"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Username</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <UserRound className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.username}
                    onChange={(event) => {
                      updateField('username', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Jason"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Display name</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <UserRound className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.displayName}
                    onChange={(event) => {
                      updateField('displayName', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Neighborhood Helper"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Location</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <MapPin className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(event) => {
                      updateField('location', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="San Jose, CA"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Nickname</span>
                <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                  <UserRound className="size-4 text-[#a46af1]" />
                  <input
                    type="text"
                    value={formState.nickname}
                    onChange={(event) => {
                      updateField('nickname', event.target.value)
                      setSubmitError('')
                    }}
                    placeholder="Jason"
                    className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Language</span>
                <select
                  value={formState.language}
                  onChange={(event) => {
                    updateField('language', event.target.value)
                    setSubmitError('')
                  }}
                  className="w-full rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-colors focus:border-[#b76ef2] focus:bg-white"
                >
                  {languageOptions.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Profile focus</span>
              <select
                value={formState.profileFocus}
                onChange={(event) => {
                  updateField('profileFocus', event.target.value)
                  setSubmitError('')
                }}
                className="w-full rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-colors focus:border-[#b76ef2] focus:bg-white"
              >
                <option>I am looking for community resources</option>
                <option>I help organize support groups</option>
                <option>I want both resources and local groups</option>
              </select>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Age group</span>
                <select
                  value={formState.ageGroup}
                  onChange={(event) => {
                    updateField('ageGroup', event.target.value)
                    setSubmitError('')
                  }}
                  className="w-full rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-colors focus:border-[#b76ef2] focus:bg-white"
                >
                  {ageGroupOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Avatar color</span>
                <select
                  value={formState.avatarColor}
                  onChange={(event) => {
                    updateField('avatarColor', event.target.value)
                    setSubmitError('')
                  }}
                  className="w-full rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-colors focus:border-[#b76ef2] focus:bg-white"
                >
                  {avatarColorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Self introduction</span>
              <textarea
                value={formState.selfIntroduction}
                onChange={(event) => {
                  updateField('selfIntroduction', event.target.value)
                  setSubmitError('')
                }}
                placeholder="I like helping my community."
                rows={4}
                className="w-full rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-colors focus:border-[#b76ef2] focus:bg-white"
              />
            </label>

            <label className="inline-flex items-start gap-3 rounded-2xl border border-[#efe5f5] bg-[#fcfbfe] px-4 py-3.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={formState.receiveUpdates}
                onChange={(event) => {
                  updateField('receiveUpdates', event.target.checked)
                }}
                className="mt-0.5 h-4 w-4 rounded border-[#d9cce7] text-[#b15ef0] focus:ring-[#b15ef0]"
              />
              <span>
                Send me occasional updates about new booths, guides, and community activities in my
                area.
              </span>
            </label>

            {submitError ? <p className="text-sm text-[#c94b74]">{submitError}</p> : null}
            {submitSuccess ? <p className="text-sm text-[#237a4c]">{submitSuccess}</p> : null}

            <button
              type="submit"
              disabled={!emailVerified || isSubmitting}
              className="w-full rounded-2xl bg-[linear-gradient(135deg,#a95bf1_0%,#f059af_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(204,94,211,0.32)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="h-px flex-1 bg-[#efe5f5]" />
            or
            <span className="h-px flex-1 bg-[#efe5f5]" />
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-2xl border border-[#eadff2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#fbf8fe]"
          >
            Continue with Google account
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-[#9a4fe0] hover:text-[#7f36cd]">
              Sign in instead
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}

export default RegisterPage