import { useI18n } from '../../../lib/i18n'

function OfficialBadge() {
  const t = useI18n()

  return (
    <span className="inline-flex items-center rounded-md border border-[#f2d884] bg-[#fff3bf] px-2.5 py-1 text-[11px] font-semibold text-[#b27c02] shadow-[0_1px_0_rgba(255,255,255,0.65)_inset]">
      ✨ {t.booths.officialBadge}
    </span>
  )
}

export default OfficialBadge