import { Link } from 'react-router-dom'
import { MessageSquareMore, Users } from 'lucide-react'
import { formatGroupCount } from '../../../lib/utils'
import type { Booth } from '../types'
import OfficialBadge from './OfficialBadge'

type BoothCardProps = {
  booth: Booth
}

function BoothCard({ booth }: BoothCardProps) {
  const accentClass = booth.isOfficial
    ? booth.category === 'School Life'
      ? 'before:bg-[#5c9af6]'
      : booth.category === 'Meals'
        ? 'before:bg-[#38cf74]'
        : 'before:bg-[#f25bad]'
    : booth.category === 'Medical Care'
      ? 'before:bg-[#33c9e7]'
      : 'before:bg-[#38cf74]'

  return (
    <article
      id={booth.slug}
      className={`relative flex h-full flex-col overflow-hidden rounded-[14px] border border-[#e7e0ea] bg-white p-5 shadow-[0_10px_24px_rgba(67,50,85,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-1.5 ${accentClass}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3 pt-2">
        <span className="rounded-md bg-[#f3f1f4] px-2.5 py-1 text-[12px] font-semibold text-[#46404e]">
          {booth.category}
        </span>
        {booth.isOfficial ? <OfficialBadge /> : null}
      </div>

      <div className="space-y-2.5">
        <h3 className="text-[17px] font-bold leading-6 text-[#2b3240]">{booth.title}</h3>
        <p className="text-[13px] leading-6 text-[#5d6677]">{booth.description}</p>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-[13px] font-medium text-[#7b8391]">
        <Users className="size-3.5" />
        <span>{formatGroupCount(booth.groupCount)}</span>
      </div>

      <div className="mt-auto flex justify-end pt-3">
        <Link
          to={`/booths?selected=${booth.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#7b8391] transition-colors hover:text-[#515b6d]"
        >
          <MessageSquareMore className="size-3.5" />
          See
        </Link>
      </div>
    </article>
  )
}

export default BoothCard