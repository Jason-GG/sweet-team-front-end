import PlaceholderPage from '../../components/ui/PlaceholderPage'
import { useI18n } from '../../lib/i18n'

function MyTownPage() {
  const t = useI18n()

  return (
    <PlaceholderPage
      eyebrow={t.placeholders.myTown.eyebrow}
      title={t.placeholders.myTown.title}
      description={t.placeholders.myTown.description}
    />
  )
}

export default MyTownPage