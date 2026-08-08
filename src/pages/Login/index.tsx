import { Eye, EyeOff, Leaf, Lock, Mail } from 'lucide-react'
import { useState, type ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../features/auth/api/authApi'
import { usePageHealthCheck } from '../../features/auth/hooks/usePageHealthCheck'
import { ApiError } from '../../lib/api/client'

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0]

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  usePageHealthCheck()

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password) {
      setErrorMessage('Enter both your email and password to sign in.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await login({
        email: normalizedEmail,
        password,
      })

      navigate('/')
    } catch (error) {
      setErrorMessage(getErrorMessage(error, 'Unable to sign in right now.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(240,86,175,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(162,78,230,0.18),_transparent_32%),linear-gradient(180deg,#fff9fc_0%,#f7f1fb_54%,#fdfcff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,255,255,0))]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[36px] border border-white/70 bg-white/72 p-8 shadow-[0_28px_90px_rgba(97,63,133,0.12)] backdrop-blur sm:p-10 lg:p-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(160,115,211,0.16)] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7d52b0] shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f589bf] to-[#a46af1] text-white shadow-[0_8px_18px_rgba(196,104,211,0.28)]">
              <Leaf className="size-4" />
            </span>
            SweetTea Login
          </div>

          <h1 className="mt-8 max-w-xl font-display text-5xl leading-tight text-slate-900 sm:text-6xl">
            Find your next trusted community space.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Sign in to save favorite booths, join local groups, and keep your guide tailored to
            what matters in your area.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['Saved booths', 'Keep official and community resources in one shortlist.'],
              ['Local groups', 'Track conversations and meetup spaces without digging around.'],
              ['Personal guide', 'Return to the support paths you care about most.'],
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
                Welcome back
              </p>
              <h2 className="mt-3 font-display text-3xl text-slate-900">Sign in to SweetTea</h2>
            </div>
            <div className="rounded-full bg-[#fff4fa] px-3 py-1 text-xs font-semibold text-[#d64d98]">
              MVP preview
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
              <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                <Mail className="size-4 text-[#a46af1]" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setErrorMessage('')
                  }}
                  placeholder="you@example.com"
                  className="w-full border-0 bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
              <span className="flex items-center gap-3 rounded-2xl border border-[#eadff2] bg-[#fcfbfe] px-4 py-3.5 transition-colors focus-within:border-[#b76ef2] focus-within:bg-white">
                <Lock className="size-4 text-[#a46af1]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setErrorMessage('')
                  }}
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#d9cce7] text-[#b15ef0] focus:ring-[#b15ef0]"
                />
                Remember me
              </label>
              <a href="#" className="font-semibold text-[#9a4fe0] hover:text-[#7f36cd]">
                Forgot password?
              </a>
            </div>

            {errorMessage ? <p className="text-sm text-[#c94b74]">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[linear-gradient(135deg,#a95bf1_0%,#f059af_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(204,94,211,0.32)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="h-px flex-1 bg-[#efe5f5]" />
            or continue with
            <span className="h-px flex-1 bg-[#efe5f5]" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              to="/register"
              className="rounded-2xl border border-[#eadff2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#fbf8fe]"
            >
              Sign up with your email address
            </Link>
            <button
              type="button"
              className="rounded-2xl border border-[#eadff2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#fbf8fe]"
            >
              Continue with Google account
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            New here?{' '}
            <Link to="/" className="font-semibold text-[#9a4fe0] hover:text-[#7f36cd]">
              Explore the app
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}

export default LoginPage