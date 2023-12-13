import { Config } from './interfaces'

export const PAGE_ITEM_COUNT = 5

export const config: Config = {
  photo: {
    title: '拍車景點',
    metaTitle: '全台拍車景點列表|解任務清單|美景地圖|停車場導覽',
    itemListKey: 'photoList',
    containerMaxWidth: '1000px',
  },
  video: {
    title: '第一人稱開車影片 (POV)',
    metaTitle:
      '第一人稱開車視角影片|汽車開箱|停車場開箱|各地景點路線導覽|公路美景|POV Drive',
    itemListKey: 'videoList',
    containerMaxWidth: '800px',
  },
}
