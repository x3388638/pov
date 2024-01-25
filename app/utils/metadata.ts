import type { Metadata } from 'next'

import ogImg from '../opengraph-image.jpg'
import ogImgPhotoList from '@public/images/ogimg-photo-list.jpg'
import ogImgVideoList from '@public/images/ogimg-video-list.png'

type Page =
  | 'Home'
  | 'PhotoList'
  | 'VideoList'
  | 'LocationDetail'
  | 'YoutubeRedirect'

const DEFAULT_METADATA = {
  title:
    '台灣拍車景點|解任務|停車場導覽|第一人稱開車視角|台灣公路風景|POV Drive',
  description:
    '搜集全台灣台北、台中、宜蘭、澎湖等各地解任務拍車景點，分享美麗風景；提供第一人稱視角的開車影片導覽各景點、停車場進出動線及內部動線，或是搭配輕鬆音樂一起徜徉在公路美景之中',
  openGraph: {
    title:
      '台灣拍車景點|解任務|停車場導覽|第一人稱開車視角|台灣公路風景|POV Drive',
    description:
      '搜集全台灣台北、台中、宜蘭、澎湖等各地解任務拍車景點，分享美麗風景；提供第一人稱視角的開車影片導覽各景點、停車場進出動線及內部動線，或是搭配輕鬆音樂一起徜徉在公路美景之中',
    images: {
      url: ogImg.src,
      height: 630,
      width: 1200,
    },
  },
  alternates: {
    canonical: 'https://pov.tw',
  },
}

export const genMetadata = (
  page: Page = 'Home',
  id?: string,
  opts?: { locationName?: string; youtubeId?: string }
): Metadata => {
  let title, description, ogImg, canonical, noindex

  switch (page) {
    case 'PhotoList': {
      title = '全台拍車景點列表|解任務清單|美景地圖|停車場導覽'
      description =
        '搜集全台灣各地台北、台中、南投、高雄、宜蘭、花蓮、台東、澎湖等各地解任務拍車景點，分享美麗風景'
      ogImg = ogImgPhotoList.src
      canonical = 'https://pov.tw/p'

      break
    }

    case 'VideoList': {
      title =
        '第一人稱開車視角|地獄停車場|賣場停車場導覽|汽車試駕|外觀內裝導覽|公路美景|POV Drive'
      description =
        '開車導覽家樂福、好市多等各式賣場停車場、室內停車場、機械式停車場，以及台灣各地景點開車動線，亦或是搭配輕鬆音樂一起徜徉在公路美景之中'
      ogImg = ogImgVideoList.src
      canonical = 'https://pov.tw/v'

      break
    }

    case 'LocationDetail': {
      if (id) {
        if (opts?.locationName) {
          title = `${opts.locationName}|拍車景點|停車場導覽|解任務|公路美景|第一人稱視角`
        }

        canonical = `https://pov.tw/p/${id}`
      }

      break
    }

    case 'YoutubeRedirect': {
      if (id) {
        if (opts?.locationName) {
          title = `前往 YouTube 觀看 ${opts.locationName} 影片`
        }

        if (opts?.youtubeId) {
          ogImg = `https://img.youtube.com/vi/${opts.youtubeId}/maxresdefault.jpg`
        }

        canonical = `https://pov.tw/y/${id}`
        noindex = true
      }

      break
    }
  }

  return {
    ...DEFAULT_METADATA,
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      ...(title && { title }),
      ...(description && { description }),
      images: {
        ...DEFAULT_METADATA.openGraph.images,
        ...(ogImg && { url: ogImg }),
      },
    },
    alternates: {
      ...DEFAULT_METADATA.alternates,
      ...(canonical && { canonical }),
    },
    ...(noindex && { robots: { index: false } }),
  }
}
