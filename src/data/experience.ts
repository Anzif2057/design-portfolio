import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    title: 'Senior Product Designer',
    company: 'Example Studio',
    role: 'Senior Product Designer',
    location: 'Remote',
    startDate: '2023',
    endDate: 'Present',
    highlights: [
      'Led end-to-end design for a multi-surface product with research and shipping ownership.',
      'Partnered with engineering to build a shared component library and interaction patterns.',
      'Mentored designers and ran critique rituals that improved consistency across squads.',
    ],
  },
  {
    id: 'exp-2',
    title: 'Product Designer',
    company: 'Example Company',
    role: 'Product Designer',
    location: 'City',
    startDate: '2021',
    endDate: '2023',
    highlights: [
      'Shipped onboarding and activation flows that clarified the core job-to-be-done.',
      'Ran weekly usability tests and translated findings into prioritized design changes.',
      'Collaborated with PMs on roadmap framing and success metrics for feature bets.',
    ],
  },
  {
    id: 'exp-3',
    title: 'Design Intern',
    company: 'Example Startup',
    role: 'Design Intern',
    startDate: '2020',
    endDate: '2021',
    highlights: [
      'Supported marketing and product design with rapid prototypes and visual explorations.',
      'Documented early UI patterns that became the seed of the team’s design system.',
    ],
  },
]
