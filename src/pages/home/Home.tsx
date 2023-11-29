import { FC } from 'react'

import Cover from './Cover'
import PhotoSection from './PhotoSection'

const Home: FC = () => {
  return (
    <div>
      <Cover />
      <PhotoSection />
      <div>video</div>
      <div>map</div>
    </div>
  )
}

export default Home
