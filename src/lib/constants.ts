import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  HeartHandshake,
  House,
  LayoutGrid,
  MapPinned,
  MessageCircleMore,
  Store,
  UserRound,
  Users,
} from 'lucide-react'
import type { BoothFilter } from '../features/booths/types'

export type NavItemKey = 'home' | 'booths' | 'groups' | 'community' | 'chat' | 'myTown' | 'guide' | 'profile'

type NavItem = {
  key: NavItemKey
  to: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  {
    key: 'home',
    to: '/',
    icon: House,
  },
  {
    key: 'booths',
    to: '/booths',
    icon: Store,
  },
  {
    key: 'groups',
    to: '/groups',
    icon: Users,
  },
  {
    key: 'community',
    to: '/community',
    icon: LayoutGrid,
  },
  {
    key: 'chat',
    to: '/chat',
    icon: MessageCircleMore,
  },
  {
    key: 'myTown',
    to: '/my-town',
    icon: MapPinned,
  },
  {
    key: 'guide',
    to: '/guide',
    icon: Compass,
  },
  {
    key: 'profile',
    to: '/profile',
    icon: UserRound,
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
