import { useEffect, useRef } from 'react'
import L, { Map, LatLngTuple } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

const DEFAULT_VIEW_CENTER: LatLngTuple = [23.9714255, 120.9860133]
const DEFAULT_ZOOM = 8

const useMap = (params: {
  eleId: string
  viewCenter?: LatLngTuple
  zoom?: number
}) => {
  const { eleId, viewCenter, zoom } = params || {}
  const mapRef = useRef<Map>()

  useEffect(() => {
    if (!eleId) {
      return
    }

    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

    // ref: https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/BkMEznmXU
    const map = L.map(eleId, {
      // @ts-ignore
      gestureHandling: true,
    }).setView(viewCenter || DEFAULT_VIEW_CENTER, zoom ?? DEFAULT_ZOOM)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    mapRef.current = map
  }, [])

  useEffect(() => {
    viewCenter && mapRef.current?.setView(viewCenter)
  }, [viewCenter])

  return mapRef
}

export default useMap
