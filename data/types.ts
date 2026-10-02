export type Difficulty = 'easy' | 'moderate' | 'hard'
export type Duration = 'half-day' | 'full-day' | '3hrs' | '4hrs' | '3-4hrs'
export type ActivityCategory = 'atv' | 'boats' | 'horseback' | 'day-trips'

export interface Waypoint {
  name: string
  description?: string
  lat?: number
  lng?: number
}

export interface Activity {
  id: string
  slug: string
  category: ActivityCategory
  operator: string
  operatorUrl?: string
  name: string
  description: string
  difficulty: Difficulty
  duration: Duration
  distanceKm?: number
  priceFrom?: string
  priceTo?: string
  waypoints?: Waypoint[]
  amenities?: string[]
  requirements?: string[]
  imageKey: string
  accent: string
}

export interface Restaurant {
  id: string
  slug: string
  tier: 'fine' | 'local' | 'beach'
  name: string
  address: string
  description: string
  orderThis: string[]
  sunsetView: boolean
  cashOnly: boolean
  imageKey: string
  urgency?: string
}

export interface MapPoint {
  id: string
  name: string
  lat: number
  lng: number
  type: 'atv' | 'boats' | 'horseback' | 'day-trip' | 'restaurant' | 'landmark'
  description: string
  slug?: string
}

export interface Comment {
  id: string
  page_slug: string
  author_name: string
  body: string
  created_at: string
}

export interface I18nStrings {
  home: string
  search: string
  explore: string
  bookNow: string
  myTrips: string
  favorites: string
  loginSignup: string
  filterBy: string
  priceLowHigh: string
  viewOnMap: string
  readMore: string
  reviews: string
  quadAtv: string
  boatTours: string
  horseback: string
  dayTrips: string
  foodDining: string
  hiddenGems: string
  snorkeling: string
  familyFriendly: string
  extremeSports: string
  sunbeds: string
  selectDate: string
  numGuests: string
  adultsChildren: string
  totalPrice: string
  confirmBooking: string
  freeCancellation: string
  soldOut: string
  noResults: string
  paymentFailed: string
  bookingConfirmed: string
  leaveTip: string
  yourName: string
  yourTip: string
  submit: string
  proTips: string
  uploadPhoto: string
  wrongPassword: string
  enterPassword: string
  myDay: string
  shareLink: string
  linkCopied: string
  morning: string
  afternoon: string
  evening: string
  wedding: string
}

export interface ImageMap {
  hero: string
  'blue-eye': string
  riviera: string
  gjirokaster: string
  butrint: string
  atv: string
  boats: string
  horseback: string
  ksamil: string
  food: string
  wedding: string
  [key: string]: string
}
