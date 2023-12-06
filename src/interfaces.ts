import { EntryCollection, EntryFieldTypes } from 'contentful'

export interface Location {
  id: string
  lat: number
  lng: number
  name: string
  desc?: string
}

export interface Photo {
  id: string
  image: string // url
  location: [number, number] // lat, lng
  date: string // YYYY-MM-DD
  pinned: boolean
  tags: string[]
}

export interface Video {
  id: string
  date: string // YYYY-MM-DD
  location: [number, number] // lat, lng
  youtubeId: string
  redirectId: number
  pinned: boolean
  tags: string[]
}

export interface LocationData {
  location: Location
  photoList: Photo[]
  videoList: Video[]
}

export interface LocationEntrySkeleton {
  contentTypeId: 'location'
  fields: {
    latLng: EntryFieldTypes.Location
    name: EntryFieldTypes.Text
    desc?: EntryFieldTypes.RichText
  }
}

export interface TagEntrySkeleton {
  contentTypeId: 'tag'
  fields: {
    name: EntryFieldTypes.Text
  }
}

export interface PhotoEntrySkeleton {
  contentTypeId: 'photo'
  fields: {
    image: EntryFieldTypes.AssetLink
    location: EntryFieldTypes.EntryLink<LocationEntrySkeleton>
    date: EntryFieldTypes.Date
    pinned: EntryFieldTypes.Boolean
    name: EntryFieldTypes.Text
    tags: Array<EntryFieldTypes.EntryLink<TagEntrySkeleton>>
  }
}

export interface VideoEntrySkeleton {
  contentTypeId: 'video'
  fields: {
    date: EntryFieldTypes.Date
    location: EntryFieldTypes.EntryLink<LocationEntrySkeleton>
    youtubeId: EntryFieldTypes.Text
    name: EntryFieldTypes.Text
    redirectId: EntryFieldTypes.Number
    pinned: EntryFieldTypes.Boolean
    tags: Array<EntryFieldTypes.EntryLink<TagEntrySkeleton>>
  }
}

export type ContentfulEntryList = EntryCollection<
  | LocationEntrySkeleton
  | TagEntrySkeleton
  | PhotoEntrySkeleton
  | VideoEntrySkeleton,
  undefined,
  string
>
