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
  links?: ProjectLink[]
  problem?: string
  research?: string
  process?: string
  solution?: string
  outcome?: string
  learnings?: string
  gallery?: ProjectImage[]
}
