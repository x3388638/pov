import { Config } from './interfaces'

export const PAGE_ITEM_COUNT = 5

export const config: Config = {
  photo: {
    title: '拍車景點',
    itemListKey: 'photoList',
    containerMaxWidth: '1400px',
  },
  video: {
    title: '第一人稱開車影片 (POV)',
    itemListKey: 'videoList',
    containerMaxWidth: '1400px',
  },
}
