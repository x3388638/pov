import {
  faInstagram,
  faYoutube,
  faGoogle,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'

export type SocialMediaInfo = {
  icon: IconDefinition
  label: string
  link: string
}

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
  },
]

export const PHOTO_SECTION_ITEM_COUNT = 10

// TODO: random items from storage (github actions -> video list static file)
export const FEATURED_YT_LIST = [
  'ray8ENHPdXU', // 74
  'mKIO7a8ClRE', // scala
  'Ear9ciGATL8', // exterior
  'XLf-og0dMhg', // penghu ferry
  'IKyWwiaotfs', // Tianyuan Temple
  'P_tBP3qRRwA', // lalaport
]
