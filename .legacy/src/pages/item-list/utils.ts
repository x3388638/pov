import { LocationData } from '@/interfaces'
import { ItemFilter, ItemListKey } from './interfaces'

export const filterItemList = (
  list: LocationData[],
  itemListKey?: ItemListKey,
  filter?: ItemFilter
): LocationData[] => {
  if (!filter) {
    return list
  } else {
    if (!itemListKey) {
      return list
    }

    const { tags, logic } = filter
    const result: LocationData[] = []

    list.forEach((locationData) => {
      const filteredItemList = locationData[itemListKey].filter(
        ({ tags: itemTags }) => {
          if (!itemTags?.length) {
            return false
          }

          if (logic === 'AND') {
            return tags?.every((t) => itemTags.includes(t))
          } else {
            return tags?.some((t) => itemTags.includes(t))
          }
        }
      )

      if (filteredItemList.length) {
        result.push({
          ...locationData,
          [itemListKey]: filteredItemList,
        })
      }
    })

    return result
  }
}
