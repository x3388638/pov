import { FC, useEffect, useRef } from 'react'
import L, { Map } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import { useAppContext } from '@/providers/AppContextProvider'

L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

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
  const mapRef = useRef<Map>()

  useEffect(() => {
    // ref: https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/BkMEznmXU
    const map = L.map('LeafletMapContainer', {
      // @ts-ignore
      gestureHandling: true,
    }).setView([23.9714255, 120.9860133], 8)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    mapRef.current = map
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
        setMaker(mapRef.current!, lat, lng)

        // TODO: set video list, photo list data in maker popup
      })
    }
  }

  return (
    <div css={{ padding: '40px 20px', background: '#fff' }}>
      <div id="LeafletMapContainer" style={{ height: '70vh', width: '100%' }} />
    </div>
  )
}

export default MapSection
