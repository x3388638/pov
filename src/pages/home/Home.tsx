import { FC } from 'react'

import Cover from './Cover'
import PhotoSection from './PhotoSection'
import VideoSection from './VideoSection'
import MapSection from './MapSection'
import Footer from './Footer'

const Home: FC = () => {
  return (
    <div>
      <Cover />
      <PhotoSection />
      <VideoSection />
      <MapSection />
      <Footer />
    </div>
  )
}

export default Home
