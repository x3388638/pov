import { FC } from 'react'

import Cover from './Cover'
import PhotoSection from './PhotoSection'
import VideoSection from './VideoSection'
import MapSection from './MapSection'

const Home: FC = () => {
  return (
    <div>
      <Cover />
      <PhotoSection />
      <VideoSection />
      <MapSection />
    </div>
  )
}

export default Home
