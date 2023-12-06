import { Asset, Entry, EntryCollection } from 'contentful'

import {
  Location,
  LocationData,
  LocationEntrySkeleton,
  PhotoEntrySkeleton,
  TagEntrySkeleton,
  VideoEntrySkeleton,
} from '@/interfaces'

export const normalizeEntryList = (
  data: EntryCollection<
    | LocationEntrySkeleton
    | TagEntrySkeleton
    | PhotoEntrySkeleton
    | VideoEntrySkeleton,
    undefined,
    string
  >
): LocationData[] => {
  const {
    locationPhotoListMap,
    locationVideoListMap,
    assetMap,
    tagMap,
    locationMap,
  } = groupByContentType(data)

  return Object.values(locationMap).map((location) => {
    const photoList = (locationPhotoListMap[location.id] || []).map(
      (photoData) => {
        const { id, image, date, pinned, tags } = photoData

        return {
          id,
          image: assetMap[(image as Asset).sys.id],
          location: [location.lat, location.lng] as [number, number],
          date: date as string,
          pinned: (pinned ?? false) as boolean,
          tags: (tags as unknown as Array<Entry<TagEntrySkeleton>>).map(
            (tag) => tagMap[tag.sys.id]
          ),
        }
      }
    )

    const videoList = (locationVideoListMap[location.id] || []).map(
      (videoData) => {
        const { id, date, youtubeId, redirectId, pinned, tags } = videoData

        return {
          id,
          date: date as string,
          location: [location.lat, location.lng] as [number, number],
          youtubeId: youtubeId as string,
          redirectId: redirectId as number,
          pinned: (pinned ?? false) as boolean,
          tags: (tags as unknown as Array<Entry<TagEntrySkeleton>>).map(
            (tag) => tagMap[tag.sys.id]
          ),
        }
      }
    )

    return {
      location,
      photoList,
      videoList,
    }
  })
}

const groupByContentType = (
  data: EntryCollection<
    | LocationEntrySkeleton
    | TagEntrySkeleton
    | PhotoEntrySkeleton
    | VideoEntrySkeleton,
    undefined,
    string
  >
) => {
  const { items = [], includes = {} } = data || {}

  const locationPhotoListMap: {
    [locationId: string]: Array<
      Entry<PhotoEntrySkeleton>['fields'] & { id: string }
    >
  } = {}
  const locationVideoListMap: {
    [locationId: string]: Array<
      Entry<VideoEntrySkeleton>['fields'] & { id: string }
    >
  } = {}
  const assetMap: Record<string, string> = {}
  const locationMap: Record<string, Location> = {}
  const tagMap: Record<string, string> = {}

  includes.Asset?.forEach((asset) => {
    const id = asset?.sys?.id
    const url = asset?.fields?.file?.url

    if (id && url) {
      assetMap[id] = url
    }
  })

  items.forEach((item) => {
    switch (item.sys.contentType.sys.id) {
      case 'location': {
        const _item = item as Entry<LocationEntrySkeleton>
        const { id } = _item.sys
        const {
          latLng: { lat, lon: lng },
          name,
          desc,
        } = _item.fields

        locationMap[id] = {
          id: id,
          lat: lat as number,
          lng: lng as number,
          name: name as string,
          desc: ((desc?.content as any[]) || [])
            .reduce((res, curr) => {
              return [
                ...res,
                (curr?.content || []).map((c: any) => c.value).join(''),
              ]
            }, [])
            .join('\n'),
        }

        break
      }

      case 'tag': {
        const {
          fields: { name },
          sys: { id },
        } = item as Entry<TagEntrySkeleton>

        tagMap[id] = name as string

        break
      }

      case 'photo': {
        const {
          fields,
          sys: { id },
        } = item as Entry<PhotoEntrySkeleton>

        const locationId = (fields.location as Entry<LocationEntrySkeleton>).sys
          .id

        locationPhotoListMap[locationId] =
          locationPhotoListMap[locationId] || []
        locationPhotoListMap[locationId].push({ id, ...fields })

        break
      }

      case 'video': {
        const {
          fields,
          sys: { id },
        } = item as Entry<VideoEntrySkeleton>

        const locationId = (fields.location as Entry<LocationEntrySkeleton>).sys
          .id

        locationVideoListMap[locationId] =
          locationVideoListMap[locationId] || []
        locationVideoListMap[locationId].push({
          id,
          ...fields,
        })

        break
      }
    }
  })

  return {
    locationPhotoListMap,
    locationVideoListMap,
    assetMap,
    tagMap,
    locationMap,
  }
}
