import type { Booth } from '../types'

export const boothMocks: Booth[] = [
  {
    id: 'health-corner',
    slug: 'tips-for-school-life',
    title: 'Tips for School Life',
    description: "Let's share about diabetes management at school",
    category: 'School Life',
    isOfficial: true,
    groupCount: 3,
  },
  {
    id: 'career-desk',
    slug: 'consultation-about-meal-concerns',
    title: 'Consultation about meal concerns',
    description: "Let's discuss a diet for blood sugar management.",
    category: 'Meals',
    isOfficial: true,
    groupCount: 3,
  },
  {
    id: 'menstruation-blood-sugar-levels',
    slug: 'menstruation-blood-sugar-levels',
    title: 'Menstruation and blood sugar levels',
    description: "Let's talk about the relationship between the menstrual cycle and blood sugar levels.",
    category: 'Menstruation and Physical Condition',
    isOfficial: true,
    groupCount: 1,
  },
  {
    id: 'hypoglycemic-experience',
    slug: 'hypoglycemic-experience',
    title: 'Share your hypoglycemic experience',
    description: 'A place to share experiences and solutions for hypoglycaemia',
    category: 'Medical Care',
    isOfficial: false,
    groupCount: 0,
  },
  {
    id: 'dining-out',
    slug: 'how-to-enjoy-dining-out',
    title: 'How to Enjoy Dining Out',
    description: 'Tips for enjoying dining out with friends',
    category: 'Meals',
    isOfficial: false,
    groupCount: 0,
  },
]