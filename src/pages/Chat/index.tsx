import PlaceholderPage from '../../components/ui/PlaceholderPage'
import { useI18n } from '../../lib/i18n'

function ChatPage() {
  const t = useI18n()

  return (
    <PlaceholderPage
      eyebrow={t.placeholders.chat.eyebrow}
      title={t.placeholders.chat.title}
      description={t.placeholders.chat.description}
    />
  )
}

export default ChatPage