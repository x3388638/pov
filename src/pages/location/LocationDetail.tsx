import { FC } from 'react'
import { useParams } from 'react-router-dom'

interface LocationDetailProps {
  type: 'video' | 'photo'
}

const LocationDetail: FC<LocationDetailProps> = ({ type }) => {
  const { locationId, itemId } = useParams()

  return (
    <div>
      {locationId}, {itemId}, {type}
    </div>
  )
}

export default LocationDetail
