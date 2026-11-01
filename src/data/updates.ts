import type { UpdatesContent } from '@/types'

export const updatesContent: UpdatesContent = {
  currently: {
    studying: 'Interaction patterns for canvas-based portfolios',
    building: 'This guided design-canvas site',
    lookingFor: 'Product design roles with strong craft culture',
  },
  availability: 'Open to conversations — usually replies within a few days.',
  entries: [
    {
      id: 'update-1',
      title: 'Portfolio rebuild kicked off',
      date: '2026-11-01',
      summary: 'Starting a canvas-style portfolio with React Flow and real HTML content.',
      tags: ['meta', 'build-in-public'],
    },
    {
      id: 'update-2',
      title: 'Exploring design systems',
      date: '2026-10-12',
      summary: 'Collecting notes on tokens, motion, and accessible interaction patterns.',
      tags: ['design'],
    },
    {
      id: 'update-3',
      title: 'Placeholder update',
      date: '2026-09-01',
      summary: 'Replace this with a real project milestone or announcement.',
    },
  ],
}

/** @deprecated Prefer updatesContent.entries — kept for barrel compatibility. */
export const updates = updatesContent.entries
