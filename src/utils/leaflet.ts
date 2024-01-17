import L, { LatLngTuple, Layer, Map, Marker } from 'leaflet'
import { GestureHandling } from 'leaflet-gesture-handling'

const DEFAULT_VIEW_CENTER: LatLngTuple = [23.9714255, 120.9860133]
const DEFAULT_ZOOM = 8

// ref: https://github.com/pointhi/leaflet-color-markers
const markerIcon = new L.Icon({
  iconUrl:
    'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export class LeafletMap {
  private markerList: Marker[] = []
  public map: Map
  constructor(params: {
    eleId: string
    viewCenter?: LatLngTuple
    zoom?: number
  }) {
    const { eleId, viewCenter, zoom } = params || {}

    if (!eleId) {
      throw new Error('Target element is not provided.')
    }

    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling)

    // ref: https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/BkMEznmXU
    this.map = L.map(eleId, {
      // @ts-ignore
      gestureHandling: true,
    }).setView(viewCenter || DEFAULT_VIEW_CENTER, zoom ?? DEFAULT_ZOOM)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)
  }

  public setMarker(
    lat: number,
    lng: number,
    popup?: {
      content: Parameters<Layer['bindPopup']>[0]
      options?: Parameters<Layer['bindPopup']>[1]
    }
  ) {
    const marker = L.marker([lat, lng], {
      icon: markerIcon,
    }).addTo(this.map)

    popup && marker.bindPopup(popup.content, popup.options || {})
    this.markerList.push(marker)

    return marker
  }

  public clearAllMarkers() {
    this.markerList.forEach((m) => {
      this.map.removeLayer(m)
    })

    this.markerList = []
  }
}
