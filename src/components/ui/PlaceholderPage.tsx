type PlaceholderPageProps = {
  eyebrow: string
  title: string
  description: string
}

function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-panel)] p-8 shadow-[var(--shadow-card)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl text-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  )
}

export default PlaceholderPage