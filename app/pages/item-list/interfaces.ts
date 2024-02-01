import { ItemType } from '@/interfaces'

export type Logic = 'AND' | 'OR'
export type ItemListKey = 'photoList' | 'videoList'
export type Config = Record<
  ItemType,
  {
    title: string
    itemListKey: ItemListKey
    containerMaxWidth: string
  }
>

export interface ItemFilter {
  tags?: string[]
  logic?: Logic
}
