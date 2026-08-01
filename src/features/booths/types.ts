export type BoothCategory =
  | 'Meals'
  | 'School Life'
  | 'Menstruation and Physical Condition'
  | 'Work'
  | 'Romance'
  | 'hobby'
  | 'Medical Care'
  | 'Other'

export type BoothFilter = 'All' | BoothCategory

export type Booth = {
  id: string
  slug: string
  title: string
  description: string
  category: BoothCategory
  isOfficial: boolean
  groupCount: number
}