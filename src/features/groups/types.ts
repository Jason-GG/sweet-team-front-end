import type { BoothCategory } from '../booths/types'

export type GroupCard = {
  id: string
  name: string
  boothId: string
  boothTitle: string
  description: string
  category: BoothCategory
  currentMembers: number
  capacity: number
  isPrivate: boolean
}
