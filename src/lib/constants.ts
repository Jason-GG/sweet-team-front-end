import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  HeartHandshake,
  House,
  MapPinned,
  MessageCircleMore,
  Store,
  UserRound,
  Users,
} from 'lucide-react'
import type { BoothFilter } from '../features/booths/types'

type NavItem = {
  label: string
  to: string
  icon: LucideIcon
  description: string
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    to: '/',
    icon: House,
    description: 'Overview and featured activity',
  },
  {
    label: 'Booths',
    to: '/booths',
    icon: Store,
    description: 'Browse official and community booths',
  },
  {
    label: 'Groups',
    to: '/groups',
    icon: Users,
    description: 'Discover student-led spaces',
  },
  {
    label: 'Personal Chat',
    to: '/chat',
    icon: MessageCircleMore,
    description: 'Direct messages and private conversations',
  },
  {
    label: 'My Town',
    to: '/my-town',
    icon: MapPinned,
    description: 'Local happenings and nearby support',
  },
  {
    label: 'Guide',
    to: '/guide',
    icon: Compass,
    description: 'Onboarding tips and campus navigation',
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: UserRound,
    description: 'Personal settings and saved spaces',
  },
]

export const boothFilters: BoothFilter[] = [
  'All',
  'Meals',
  'School Life',
  'Menstruation and Physical Condition',
  'Work',
  'Romance',
  'hobby',
  'Medical Care',
  'Other',
]

export const homeHighlights = [
  {
    title: 'Official support',
    detail: 'Campus-backed booths for essentials, health, and guidance.',
    icon: HeartHandshake,
  },
  {
    title: 'Community energy',
    detail: 'Peer-led rooms and topic clusters that update quickly.',
    icon: Users,
  },
  {
    title: 'Low-friction discovery',
    detail: 'Find the right space by category before you join a group.',
    icon: Compass,
  },
]