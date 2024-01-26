import { FC, useEffect, useRef } from 'react'

import { LeafletMap } from '@/utils/leaflet'
import { LocationData } from '@/interfaces'

const MapSection: FC<{ targetLocation: LocationData | null | undefined }> = ({
  targetLocation,
}) => {
  const mapRef = useRef<LeafletMap>()

  useEffect(() => {
    if (targetLocation) {
      if (!mapRef.current) {
        mapRef.current = new LeafletMap({
          eleId: 'LeafletMapContainer',
          zoom: 18,
          viewCenter: [
            targetLocation.location.lat,
            targetLocation.location.lng,
          ],
        })

        mapRef.current.setMarker(
          targetLocation.location.lat,
          targetLocation.location.lng
        )
      }
    }
  }, [targetLocation])

  return (
    <div id="LeafletMapContainer" style={{ height: '100%', width: '100%' }} />
  )
}

export default MapSection
