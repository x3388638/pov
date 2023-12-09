import { FC, useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import { Map, Marker } from 'leaflet'
import styled from '@emotion/styled'

import { useAppContext } from '@/providers/AppContextProvider'
import { initMap, setMarker } from '@/utils/leaflet'

const Container = styled.div`
  padding: 10px 20px;
  background: #fff;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

const MapSection: FC = () => {
  const { locationList } = useAppContext()
  const mapRef = useRef<Map>()
  const markerListRef = useRef<Marker[]>([])

  useEffect(() => {
    mapRef.current = initMap({ eleId: 'LeafletMapContainer' }) as Map
  }, [])

  useEffect(() => {
    if (locationList.length) {
      setMarkers()
    }
  }, [locationList])

  const clearMarkers = () => {
    markerListRef.current.forEach((marker) => {
      mapRef.current?.removeLayer(marker)
    })

    markerListRef.current = []
  }

  const setMarkers = () => {
    if (mapRef.current) {
      clearMarkers()
      locationList.forEach(({ location, photoList, videoList }) => {
        const { lat, lng } = location
        const hasPhoto = !!photoList.length
        const hasVideo = !!videoList.length

        markerListRef.current.push(
          setMarker(mapRef.current!, lat, lng, {
            content: renderToString(
              <div style={{ minWidth: '150px' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  {location.name}
                </h1>
                {hasPhoto && <div>照片x{photoList.length}</div>}
                {hasVideo && <div>影片x{videoList.length}</div>}
                <a href={`/#/p/${location.id}`}>前往查看</a>
              </div>
            ),
          })
        )
      })
    }
  }

  return (
    <Container>
      <div id="LeafletMapContainer" style={{ height: '80vh', width: '100%' }} />
    </Container>
  )
}

export default MapSection
