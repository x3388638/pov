'use client'

import dynamic from 'next/dynamic'

import PhotoSection from './photo-section'
import VideoSection from './video-section'
const MapSection = dynamic(() => import('./map-section'), {
  ssr: false,
})

const Home = () => {
  return (
    <>
      <PhotoSection />
      <VideoSection />
      <MapSection />
    </>
  )
}

export default Home
