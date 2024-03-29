import { FC, useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server'
import styled from 'styled-components'
import Link from 'next/link'

import { useAppContext } from '@/providers/app-context'
import { LeafletMap } from '@/utils/leaflet'

const Container = styled.div`
  padding: 10px 20px;
  background: #fff;
  position: relative;
  z-index: 0;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

const MapSection: FC = () => {
  const { locationList } = useAppContext()
  const mapRef = useRef<LeafletMap>()

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new LeafletMap({ eleId: 'LeafletMapContainer' })
    }
  }, [])

  useEffect(() => {
    if (locationList.length) {
      setMarkers()
    }
  }, [locationList])

  const setMarkers = () => {
    if (mapRef.current) {
      mapRef.current.clearAllMarkers()
      locationList.forEach(({ location, photoList, videoList }) => {
        const { lat, lng } = location
        const hasPhoto = !!photoList.length
        const hasVideo = !!videoList.length

        mapRef.current?.setMarker(lat, lng, {
          content: renderToString(
            <div style={{ minWidth: '150px' }}>
              <h1 style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {location.name}
              </h1>
              {hasPhoto && <div>照片x{photoList.length}</div>}
              {hasVideo && <div>影片x{videoList.length}</div>}
              <Link href={`/p/${location.id}`}>前往查看</Link>
            </div>
          ),
        })
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
