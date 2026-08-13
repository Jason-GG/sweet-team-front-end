import { MessageSquareMore, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../../lib/i18n'
import type { GroupCard } from '../types'

type GroupListItemProps = {
  group: GroupCard
}

function getAccentClass(category: GroupCard['category']) {
  if (category === 'School Life') {
    return 'before:bg-[#4b82f5]'
  }

  if (category === 'Meals') {
    return 'before:bg-[#27c96c]'
  }

  return 'before:bg-[#f55aa4]'
}

function GroupListItem({ group }: GroupListItemProps) {
  const t = useI18n()

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#e7dfea] bg-white p-5 shadow-[0_10px_28px_rgba(75,58,98,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-1 ${getAccentClass(group.category)}`}
    >
      <div className="space-y-3 pt-2">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-[#f3f1f4] px-2.5 py-1 text-[12px] font-semibold text-[#47414e]">
            {t.groups.availability}
          </span>
          <span className="rounded-md border border-[#e6e1ea] bg-white px-2.5 py-1 text-[12px] font-semibold text-[#47414e]">
            {group.boothTitle}
          </span>
          {group.isPrivate ? (
            <span className="rounded-md border border-[#ead7fb] bg-[#f7f0ff] px-2.5 py-1 text-[12px] font-semibold text-[#8e54d6]">
              {t.groups.private}
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-[17px] font-extrabold leading-8 text-[#2d3443]">{group.name}</h3>
          <p className="mt-1 text-[13px] leading-6 text-[#5d6677]">{group.description}</p>
        </div>

        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#6f7688]">
          <Users className="size-3.5" />
          <span>{t.groups.members(group.currentMembers, group.capacity)}</span>
        </div>

        <div className="flex justify-end pt-2">
          <Link
            to={`/community/${group.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#7b8391] transition-colors hover:text-[#515b6d]"
          >
            <MessageSquareMore className="size-3.5" />
            {t.booths.see}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default GroupListItem
