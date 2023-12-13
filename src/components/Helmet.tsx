import { FC } from 'react'
import { Helmet } from 'react-helmet'

import ogImg from '@/assets/images/ogImg.jpg'

interface ComponentProps {
  title?: string
  desc?: string
  image?: string
}

const DEFAULT_TITLE =
  '台灣拍車景點|解任務|停車場導覽|第一人稱開車視角|台灣公路風景|POV Drive'

const DEFAULT_DESC =
  '搜集全台灣台北、台中、宜蘭、澎湖等各地解任務拍車景點，分享美麗風景；提供第一人稱視角的開車影片導覽各景點、停車場進出動線及內部動線，或是搭配輕鬆音樂一起徜徉在公路美景之中'

const DEFAULT_IMAGE = `${location.origin}${ogImg}`

const Component: FC<ComponentProps> = ({ title, desc, image }) => {
  return (
    <Helmet>
      <title>{title || DEFAULT_TITLE}</title>
      <meta name="description" content={desc || DEFAULT_DESC} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta property="og:description" content={desc || DEFAULT_DESC} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image || DEFAULT_IMAGE} />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:width" content="1200" />
    </Helmet>
  )
}

export default Component
