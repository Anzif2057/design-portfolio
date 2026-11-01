export type SectionId = 'updates' | 'about' | 'skills' | 'experience' | 'work'

export type SkillCategory = 'Research' | 'Design' | 'Front-end' | 'Product'

export interface BaseEntry {
  id: string
  title: string
}

export interface UpdateEntry extends BaseEntry {
  date: string
  summary: string
  tags?: string[]
}

export interface CurrentlyStatus {
  studying?: string
  building?: string
  lookingFor?: string
}

export interface UpdatesContent {
  currently: CurrentlyStatus
  availability: string
  entries: UpdateEntry[]
}

export interface AboutContent {
  name: string
  role: string
  location: string
  email: string
  status: string
  education: string
  focusAreas: string[]
  photoAlt: string
  bio: string[]
  links: { label: string; href: string }[]
}

export interface SkillEntry extends BaseEntry {
  category: SkillCategory
  level: 'familiar' | 'proficient' | 'expert'
  description?: string
  relatedProjectSlugs?: string[]
}

export interface ExperienceEntry extends BaseEntry {
  company: string
  role: string
  location?: string
  startDate: string
  endDate: string | 'Present'
  highlights: string[]
}

export interface ProjectImage {
  src: string
  alt: string
}

/** Transparent mockup used by the home-page showcase; size is its intrinsic pixels. */
export interface ProjectCover extends ProjectImage {
  width: number
  height: number
}

export interface ProjectLink {
  label: string
  href: string
}

/** Case-study project. Optional narrative fields render only when present. */
export interface WorkProject {
  slug: string
  title: string
  summary: string
  role: string
  year: string
  timeline?: string
  team?: string
  tools?: string[]
  tags?: string[]
  featured?: boolean
  coverImage: ProjectImage
  /** Showcase mockup; projects without one are left out of the home-page showcase. */
  cover?: ProjectCover
  /** One short result line for the showcase comment pin. */
  outcomeLine?: string
  /** Fixed showcase slant in degrees (desktop; the mobile slider uses half). */
  angle?: number
  links?: ProjectLink[]
  problem?: string
  research?: string
  process?: string
  solution?: string
  outcome?: string
  learnings?: string
  gallery?: ProjectImage[]
}

export type ShowcaseProject = WorkProject & { cover: ProjectCover }
