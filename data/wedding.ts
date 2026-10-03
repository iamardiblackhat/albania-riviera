/**
 * Wedding details. EDIT THIS FILE — the /wedding page renders entirely from here.
 * Any field left as an empty string simply does not render.
 */

export const wedding = {
  bride: 'Erda',
  groom: 'Faton',
  /** Shown under the names. */
  dateLabel: 'Summer 2026',
  /**
   * ISO date (YYYY-MM-DD) if you know it. This switches on the live
   * countdown. Leave as '' until confirmed and the page just shows dateLabel.
   */
  isoDate: '',
  venue: 'Saranda, Albania',
  country: 'Albania',

  /**
   * Order of the day. `time` is optional.
   * Add, remove or reorder freely.
   */
  schedule: [
    { time: '', title: 'Ceremony', detail: '' },
    { time: '', title: 'Drinks and photographs', detail: '' },
    { time: '', title: 'Dinner', detail: '' },
    { time: '', title: 'Dancing', detail: '' },
  ],

  /** Short practical notes for guests. Empty strings are skipped. */
  notes: [
    { title: 'Dress', detail: '' },
    { title: 'Getting there', detail: 'Saranda is about 40 minutes from Corfu airport.' },
    { title: 'Money', detail: 'Take cash. Plenty of places do not take cards.' },
    { title: 'Sun', detail: 'Bring sunscreen. It is hotter than you expect.' },
  ],

  message: '',

  /**
   * Paste a Google Photos shared album link here and the photo wall links to it.
   */
  photoAlbumUrl: '',
}

export type Wedding = typeof wedding