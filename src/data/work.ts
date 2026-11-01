import type { ShowcaseProject, WorkProject } from '@/types'

export const workIntro = 'A few things I’ve designed and built.'

export const work: WorkProject[] = [
  {
    slug: 'ravewards',
    title: 'Ravewards',
    summary: 'A loyalty experience that makes nightlife rewards feel instant and social.',
    role: 'Lead product designer',
    year: '2025',
    timeline: '16 weeks',
    team: '1 PM, 2 engineers, 1 researcher',
    tools: ['Figma', 'FigJam', 'React'],
    tags: ['product', 'mobile', 'loyalty'],
    featured: true,
    coverImage: {
      src: '/placeholder-image.svg',
      alt: 'Ravewards app screens arranged on a dark stage-like background',
    },
    cover: {
      src: '/work/ravewards.svg',
      alt: 'Ravewards nightlife loyalty app: two phone mockups showing tonight’s rewards and a reward pass, with a claimed-reward ticket',
      width: 720,
      height: 600,
    },
    outcomeLine: 'Doubled reward opt-in during pilots',
    angle: 2.5,
    links: [{ label: 'Prototype', href: '#' }],
    problem:
      'Venue guests abandoned loyalty programs that felt slow, opaque, and disconnected from the night out.',
    research:
      'Interviewed regulars and door staff; mapped friction from entry to reward redemption across three venues.',
    process:
      'Explored live “pulse” reward moments, staff tooling, and a guest feed. Prototyped two flows and tested with five participants.',
    solution:
      'A guest app that surfaces time-bound rewards mid-night, plus a light staff console for validation without breaking the vibe.',
    outcome:
      'Placeholder impact: higher opt-in during pilots and faster redemption compared with the paper stamp cards.',
    learnings:
      'Real-time cues beat delayed points. Staff tooling has to be one-thumb simple under low light.',
    gallery: [
      {
        src: '/placeholder-image.svg',
        alt: 'Ravewards home screen showing tonight’s active rewards',
      },
      {
        src: '/placeholder-image.svg',
        alt: 'Reward claim confirmation with a subtle motion cue',
      },
      {
        src: '/placeholder-image.svg',
        alt: 'Staff console validating a guest reward at the door',
      },
    ],
  },
  {
    slug: 'northline',
    title: 'Northline',
    summary: 'A design system and marketing site rebuild for a B2B logistics platform.',
    role: 'Product designer',
    year: '2024',
    timeline: '12 weeks',
    team: 'Design lead, 3 engineers',
    tools: ['Figma', 'Storybook'],
    tags: ['systems', 'web'],
    coverImage: {
      src: '/placeholder-image.svg',
      alt: 'Northline component grid and typography specimens',
    },
    cover: {
      src: '/work/northline.svg',
      alt: 'Northline logistics design system: laptop mockup showing the rebuilt marketing site and component grid',
      width: 600,
      height: 420,
    },
    outcomeLine: 'Halved landing-page build time',
    angle: -4.5,
    problem:
      'Product and marketing surfaces drifted visually, slowing launches and confusing customers.',
    process:
      'Audited UI debt, defined tokens, and rebuilt core components with engineering pairing sessions.',
    solution:
      'A documented token set and component library shared by product and marketing.',
    outcome: 'Placeholder: fewer one-off styles and faster landing-page assembly.',
    gallery: [
      {
        src: '/placeholder-image.svg',
        alt: 'Northline color tokens and type ramp',
      },
      {
        src: '/placeholder-image.svg',
        alt: 'Button and form component states in Storybook',
      },
    ],
  },
  {
    slug: 'pulseboard',
    title: 'Pulseboard',
    summary:
      'A research ops dashboard that turns interview notes into shareable insights.',
    role: 'Product designer',
    year: '2023',
    timeline: '10 weeks',
    team: 'Solo design with two engineers',
    tools: ['Figma', 'Notion'],
    tags: ['research', 'saas'],
    coverImage: {
      src: '/placeholder-image.svg',
      alt: 'Pulseboard insight board with tagged quotes',
    },
    cover: {
      src: '/work/pulseboard.svg',
      alt: 'Pulseboard research dashboard: browser window mockup with columns of tagged insight cards',
      width: 600,
      height: 420,
    },
    outcomeLine: 'Insights reused by 4 teams',
    angle: 5,
    problem:
      'Researchers buried insights in docs that stakeholders never revisited after the readout.',
    research: 'Shadowed three research cycles and catalogued where synthesis stalled.',
    solution:
      'A lightweight board for quotes, tags, and evidence linked back to source notes.',
    learnings:
      'Synthesis tools fail when capture is heavy—defaults must feel faster than a blank doc.',
    gallery: [
      {
        src: '/placeholder-image.svg',
        alt: 'Pulseboard kanban of insight themes',
      },
    ],
  },
  {
    slug: 'slotwise',
    title: 'Slotwise',
    summary: 'A booking flow for a network of walk-in clinics.',
    role: 'UX designer',
    year: '2022',
    timeline: '8 weeks',
    team: '1 PM, 2 engineers',
    tools: ['Figma', 'Maze'],
    tags: ['mobile', 'healthcare'],
    coverImage: {
      src: '/placeholder-image.svg',
      alt: 'Slotwise booking screens with a calendar and time slots',
    },
    cover: {
      src: '/work/slotwise.svg',
      alt: 'Slotwise clinic booking app: phone mockup with a time-slot picker next to a booking confirmation card',
      width: 600,
      height: 420,
    },
    outcomeLine: 'Cut booking time by 30%',
    angle: -3.5,
    problem: 'Patients abandoned a seven-step booking form, mostly on mobile.',
    solution: 'A three-step flow that suggests the nearest open slot first.',
    outcome: 'Placeholder: shorter bookings and fewer phone calls to front desks.',
  },
]

/** Projects with a mockup, in data order, for the home-page showcase. */
export const showcaseProjects = work.filter((project): project is ShowcaseProject =>
  Boolean(project.cover),
)

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return work.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: WorkProject | null
  next: WorkProject | null
} {
  const index = work.findIndex((project) => project.slug === slug)
  if (index === -1) {
    return { prev: null, next: null }
  }
  return {
    prev: work[(index - 1 + work.length) % work.length] ?? null,
    next: work[(index + 1) % work.length] ?? null,
  }
}
