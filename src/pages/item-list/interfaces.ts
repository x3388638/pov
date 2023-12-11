export type ItemType = 'video' | 'photo'
export type Config = Record<
  ItemType,
  {
    title: string
    itemListKey: 'photoList' | 'videoList'
  }
>
