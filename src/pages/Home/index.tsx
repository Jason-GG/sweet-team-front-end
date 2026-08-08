import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Compass, HeartHandshake, Users } from 'lucide-react'
import { useI18n } from '../../lib/i18n'

function HomePage() {
  const t = useI18n()
  const highlightIcons = [HeartHandshake, Users, Compass] as const

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-8 shadow-[var(--shadow-card)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-coral)]">
            {t.home.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl text-slate-900 sm:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {t.home.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/booths"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t.home.exploreBooths}
              <ArrowRight className="size-4" />
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-medium text-slate-600">
              <Sparkles className="size-4 text-[var(--color-coral)]" />
              {t.home.mockData}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-[var(--color-line)] bg-slate-900 p-8 text-white shadow-[var(--shadow-card)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
            {t.home.doneTitle}
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-white/80">
            {t.home.doneItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {t.home.highlights.map((highlight, index) => {
          const Icon = highlightIcons[index]

          return (
            <article
              key={highlight.title}
              className="rounded-[28px] border border-[var(--color-line)] bg-white/90 p-6 shadow-[var(--shadow-card)]"
            >
              <div className="inline-flex rounded-full bg-amber-100 p-3 text-amber-900">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-4 font-display text-2xl text-slate-900">{highlight.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{highlight.detail}</p>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default HomePage