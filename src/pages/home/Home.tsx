import { FC } from 'react'

import Cover from './Cover'
import PhotoSection from './PhotoSection'
import VideoSection from './VideoSection'

const Home: FC = () => {
  return (
    <div>
      <Cover />
      <PhotoSection />
      <VideoSection />
      <div>map</div>
    </div>
  )
}

export default Home
