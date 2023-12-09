import { FC } from 'react'

import Cover from '@/components/Cover'
import Footer from '@/components/Footer'
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
      <Footer />
    </div>
  )
}

export default Home
