export type ItemType = 'video' | 'photo'
export type Logic = 'AND' | 'OR'
export type ItemListKey = 'photoList' | 'videoList'
export type Config = Record<
  ItemType,
  {
    title: string
    itemListKey: ItemListKey
  }
>

export interface ItemFilter {
  tags?: string[]
  logic?: Logic
}
