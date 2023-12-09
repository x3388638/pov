import { FC, useEffect } from 'react'
import L, { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import styled from '@emotion/styled'

import { useAppContext } from '@/providers/AppContextProvider'
import useMap from '@/hooks/useMap'

const Container = styled.div`
  padding: 10px 20px;
  background: #fff;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

// ref: https://github.com/pointhi/leaflet-color-markers
const makerIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const setMaker = (map: Map, lat: number, lng: number) => {
  const marker = L.marker([lat, lng], {
    icon: makerIcon,
  }).addTo(map)

  // TODO: popup content
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.')
}

const MapSection: FC = () => {
  const { locationList } = useAppContext()
  const mapRef = useMap({ eleId: 'LeafletMapContainer' })

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
        setMaker(mapRef.current!, lat, lng)

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
