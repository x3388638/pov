import { faInstagram, faYoutube, faGoogle, IconDefinition } from '@fortawesome/free-brands-svg-icons'

export type SocialMediaInfo = { icon: IconDefinition, label: string, link: string }

export const SOCIAL_MEDIA_LIST: SocialMediaInfo[] = [
  {
    icon: faInstagram,
    label: 'yy.garage___',
    link: 'https://instagram.com/yy.garage___',
  },
  {
    icon: faYoutube,
    label: '@POVDriveTaiwan',
    link: 'https://www.youtube.com/@POVDriveTaiwan',
  },
  {
    icon: faGoogle,
    label: 'Reviews on Maps',
    link: 'https://map.pov.tw',
  }
]

// TODO: random items from storage (github actions -> video list static file)
export const FEATURED_YT_LIST = [
  'ray8ENHPdXU', // 74
  'mKIO7a8ClRE', // scala
  'Ear9ciGATL8', // exterior
  'XLf-og0dMhg', // penghu ferry
  'IKyWwiaotfs', // Tianyuan Temple
  'P_tBP3qRRwA', // lalaport
]

// FIXME: random items from storage (contentful -> github actions -> static file)
export const MOCK_PINNED_PHOTO_LIST = [
  'https://fakeimg.pl/1200x900/',
  'https://fakeimg.pl/900x1200/',
  'https://fakeimg.pl/1200x1500/',
  'https://fakeimg.pl/1200x900/',
  'https://fakeimg.pl/900x1200/',
  'https://fakeimg.pl/1200x1500/',
  'https://fakeimg.pl/1200x900/',
  'https://fakeimg.pl/900x1200/',
  'https://fakeimg.pl/1200x1500/',
  'https://fakeimg.pl/1200x1500/',
]
