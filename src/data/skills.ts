import type { SkillEntry } from '@/types'

export const SKILL_CATEGORY_ORDER = [
  'Research',
  'Design',
  'Front-end',
  'Product',
] as const

export const skills: SkillEntry[] = [
  {
    id: 'skill-research-1',
    title: 'User interviews',
    category: 'Research',
    level: 'proficient',
    relatedProjectSlugs: ['pulseboard'],
  },
  {
    id: 'skill-research-2',
    title: 'Usability testing',
    category: 'Research',
    level: 'familiar',
    relatedProjectSlugs: ['ravewards'],
  },
  {
    id: 'skill-design-1',
    title: 'Interaction design',
    category: 'Design',
    level: 'expert',
    relatedProjectSlugs: ['ravewards', 'northline'],
  },
  {
    id: 'skill-design-2',
    title: 'Design systems',
    category: 'Design',
    level: 'proficient',
    relatedProjectSlugs: ['northline'],
  },
  {
    id: 'skill-design-3',
    title: 'Visual design',
    category: 'Design',
    level: 'proficient',
  },
  {
    id: 'skill-fe-1',
    title: 'React / TypeScript',
    category: 'Front-end',
    level: 'proficient',
    relatedProjectSlugs: ['ravewards'],
  },
  {
    id: 'skill-fe-2',
    title: 'Accessible HTML/CSS',
    category: 'Front-end',
    level: 'proficient',
  },
  {
    id: 'skill-product-1',
    title: 'Product strategy',
    category: 'Product',
    level: 'familiar',
    relatedProjectSlugs: ['pulseboard'],
  },
  {
    id: 'skill-product-2',
    title: 'Roadmapping',
    category: 'Product',
    level: 'familiar',
  },
]
