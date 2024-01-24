import { FC } from 'react'

import Cover from '@/components/cover'
import Footer from '@/components/footer'
import Helmet from '@/components/Helmet'
import PhotoSection from './PhotoSection'
import VideoSection from './VideoSection'
import MapSection from './MapSection'

const Home: FC = () => {
  return (
    <div>
      <Helmet />
      <Cover />
      <PhotoSection />
      <VideoSection />
      <MapSection />
      <Footer />
    </div>
  )
}

export default Home
