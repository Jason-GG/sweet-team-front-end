import type { Booth } from '../types'
import BoothCard from './BoothCard'

type BoothGridProps = {
  officialBooths: Booth[]
  communityBooths: Booth[]
}

function BoothSection({
  title,
  booths,
}: {
  title: string
  booths: Booth[]
}) {
  if (booths.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[18px] text-[#f6b624]">✨</span>
        <h2 className="text-[18px] font-bold text-[#283042]">{title}</h2>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {booths.map((booth) => (
          <BoothCard key={booth.id} booth={booth} />
        ))}
      </div>
    </section>
  )
}

function BoothGrid({ officialBooths, communityBooths }: BoothGridProps) {
  return (
    <div className="space-y-10">
      <BoothSection title="Official Booth" booths={officialBooths} />
      <BoothSection title="Everyone's Booth" booths={communityBooths} />
    </div>
  )
}

export default BoothGrid