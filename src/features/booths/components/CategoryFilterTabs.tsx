import { cn } from '../../../lib/utils'
import type { BoothFilter } from '../types'

type CategoryFilterTabsProps = {
  categories: BoothFilter[]
  activeFilter: BoothFilter
  onChange: (nextFilter: BoothFilter) => void
}

function CategoryFilterTabs({
  categories,
  activeFilter,
  onChange,
}: CategoryFilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-[#eadff0] bg-white px-4 py-3 shadow-[0_6px_18px_rgba(92,72,123,0.08)]">
      {categories.map((category) => {
        const isActive = activeFilter === category

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'rounded-md border px-4 py-2 text-[13px] font-semibold transition-colors',
              isActive
                ? 'border-[#dc5dea] bg-gradient-to-r from-[#b96bf3] to-[#f44da7] text-white shadow-[0_8px_20px_rgba(220,93,234,0.28)]'
                : 'border-[#e6e2ec] bg-white text-[#474357] hover:border-[#d9cedf] hover:bg-[#fbf9fd]'
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilterTabs