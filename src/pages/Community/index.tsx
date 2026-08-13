import { useState } from 'react'
import BoothCard from '../../features/booths/components/BoothCard'
import CategoryFilterTabs from '../../features/booths/components/CategoryFilterTabs'
import { useBooths } from '../../features/booths/hooks/useBooths'
import type { BoothFilter } from '../../features/booths/types'
import GroupListItem from '../../features/groups/components/GroupListItem'
import { useGroups } from '../../features/groups/hooks/useGroups'
import { useI18n } from '../../lib/i18n'

function CommunityPage() {
  const t = useI18n()
  const [activeFilter, setActiveFilter] = useState<BoothFilter>('All')
  const { categories, officialBooths, error, isLoading } = useBooths(activeFilter)
  const { groups } = useGroups()

  const filteredGroups =
    activeFilter === 'All'
      ? groups
      : groups.filter((group) => group.category === activeFilter)

  const showContent = !isLoading && !error

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-[44px] font-bold tracking-[-0.04em] text-[#283042]">{t.community.title}</h1>
        <p className="mt-2 text-[17px] text-[#677083]">{t.community.subtitle}</p>

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

      {showContent ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">✨</span>
              <h2 className="text-[18px] font-bold text-[#283042]">{t.booths.officialSection}</h2>
            </div>

            {officialBooths.length > 0 ? (
              <div className="space-y-4">
                {officialBooths.map((booth) => (
                  <BoothCard key={booth.id} booth={booth} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-[#d9cedf] bg-white/70 p-6 text-sm text-[#5d6677]">
                {t.booths.empty}
              </p>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[18px]">👥</span>
              <h2 className="text-[18px] font-bold text-[#283042]">{t.booths.communitySection}</h2>
            </div>

            {filteredGroups.length > 0 ? (
              <div className="space-y-4">
                {filteredGroups.map((group) => (
                  <GroupListItem key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-[#d9cedf] bg-white/70 p-6 text-sm text-[#5d6677]">
                {t.booths.empty}
              </p>
            )}
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default CommunityPage
