import { faInstagram, faYoutube, IconDefinition } from '@fortawesome/free-brands-svg-icons'

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
]

// FIXME
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
