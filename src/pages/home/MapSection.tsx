import { FC, useEffect, useRef } from 'react'
import { Map } from 'leaflet'
import styled from '@emotion/styled'

import { useAppContext } from '@/providers/AppContextProvider'
import { initMap, setMaker } from '@/utils/leaflet'

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

  useEffect(() => {
    mapRef.current = initMap({ eleId: 'LeafletMapContainer' }) as Map
  }, [])

  useEffect(() => {
    // TODO: reset makers
    if (locationList.length) {
      setMakers()
    }
  }, [locationList])

  const setMakers = () => {
    if (mapRef.current) {
      locationList.forEach(({ location }) => {
        const { lat, lng } = location
        setMaker(mapRef.current!, lat, lng, { content: 'popup!!!' })

        // TODO: set video list, photo list data in maker popup
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
