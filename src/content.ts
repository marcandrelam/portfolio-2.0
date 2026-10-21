// All site copy lives here so layouts can change without touching content.

export type SectionId = 'work' | 'experience' | 'about' | 'fun'

export interface Section {
  id: SectionId
  label: string
  path: string
}

export const SITE = {
  name: 'Marc Andre Lam',
}

// Order here is the order of the main menu.
export const SECTIONS: Section[] = [
  { id: 'work', label: 'Featured Work', path: '/work' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'fun', label: 'Fun', path: '/fun' },
]
