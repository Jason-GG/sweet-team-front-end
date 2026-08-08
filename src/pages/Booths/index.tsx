import { useState } from 'react'
import BoothGrid from '../../features/booths/components/BoothGrid'
import CategoryFilterTabs from '../../features/booths/components/CategoryFilterTabs'
import { useBooths } from '../../features/booths/hooks/useBooths'
import { useI18n } from '../../lib/i18n'
import type { BoothFilter } from '../../features/booths/types'

function BoothsPage() {
  const t = useI18n()
  const [activeFilter, setActiveFilter] = useState<BoothFilter>('All')
  const { categories, communityBooths, error, isLoading, officialBooths, booths } =
    useBooths(activeFilter)

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-[44px] font-bold tracking-[-0.04em] text-[#283042]">{t.booths.title}</h1>
        <p className="mt-2 text-[17px] text-[#677083]">{t.booths.subtitle}</p>

        <div className="mt-7 max-w-5xl">
          <CategoryFilterTabs
            categories={categories}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </section>

      {isLoading ? (
        <section className="rounded-2xl border border-dashed border-[#d9cedf] bg-white/70 p-8 text-sm text-[#5d6677]">
          {t.booths.loading}
        </section>
      ) : null}

      {error ? (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-sm text-rose-800">
          {error}
        </section>
      ) : null}

      {!isLoading && !error && booths.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-[#d9cedf] bg-white/70 p-8 text-sm text-[#5d6677]">
          {t.booths.empty}
        </section>
      ) : null}

      {!isLoading && !error && booths.length > 0 ? (
        <BoothGrid officialBooths={officialBooths} communityBooths={communityBooths} />
      ) : null}
    </div>
  )
}

export default BoothsPage