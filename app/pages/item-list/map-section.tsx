import { FC, useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LatLngTuple } from 'leaflet'

import { ItemType, LocationData } from '@/interfaces'
import { LeafletMap } from '@/utils/leaflet'

export interface MapSectionProps {
  locationList: LocationData[]
  type: ItemType
  mapCenter?: LatLngTuple
}

const MapSection: FC<MapSectionProps> = ({ locationList, type, mapCenter }) => {
  const mapRef = useRef<LeafletMap>()

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new LeafletMap({ eleId: 'LeafletMapContainer' })
    }
  }, [type])

  useEffect(() => {
    setMarkers(locationList)

    const { location } = locationList[0] || {}

    if (location) {
      mapRef.current?.map.flyTo([location.lat, location.lng], 8, {
        duration: 1,
      })
    }
  }, [locationList])

  useEffect(() => {
    if (mapCenter && mapRef.current) {
      mapRef.current.map.flyTo(mapCenter, 16, { duration: 1 })
    }
  }, [mapCenter])

  const setMarkers = (list: LocationData[]) => {
    if (mapRef.current) {
      mapRef.current.clearAllMarkers()
      list.forEach(({ location }) => {
        const { lat, lng, id, name } = location

        mapRef.current?.setMarker(lat, lng, {
          content: renderToString(
            <a href={`/${type === 'photo' ? 'p' : 'v'}/${id}`} target="_blank">
              {name} <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
          ),
        })
      })
    }
  }

  return (
    <div id="LeafletMapContainer" style={{ height: '100%', width: '100%' }} />
  )
}

export default MapSection
