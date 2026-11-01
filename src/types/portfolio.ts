export type SectionId = 'updates' | 'about' | 'skills' | 'experience' | 'work'

export interface BaseEntry {
  id: string
  title: string
}

export interface UpdateEntry extends BaseEntry {
  date: string
  summary: string
  tags?: string[]
}

export interface AboutContent {
  name: string
  role: string
  location: string
  bio: string[]
  links: { label: string; href: string }[]
}

export interface SkillEntry extends BaseEntry {
  category: string
  level: 'familiar' | 'proficient' | 'expert'
  description?: string
}

export interface ExperienceEntry extends BaseEntry {
  company: string
  role: string
  location?: string
  startDate: string
  endDate: string | 'Present'
  highlights: string[]
}

export interface WorkEntry extends BaseEntry {
  year: string
  summary: string
  role?: string
  tags?: string[]
  href?: string
  imageSrc?: string
}
