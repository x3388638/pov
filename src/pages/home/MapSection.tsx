import { FC, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapSection: FC = () => {
  useEffect(() => {
    // ref: https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/BkMEznmXU
    const map = L.map('LeafletMapContainer').setView([25.03418, 121.564517], 17) // FIXME
    const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer(OSMUrl).addTo(map)

    // ref: https://github.com/pointhi/leaflet-color-markers
    const greenIcon = new L.Icon({
      iconUrl:
        'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    const marker = L.marker([25.03418, 121.564517], { icon: greenIcon }).addTo(
      map
    )

    marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()
  }, [])

  return (
    <div css={{ padding: '40px 20px', background: '#fff' }}>
      <div id="LeafletMapContainer" style={{ height: '70vh', width: '100%' }} />
    </div>
  )
}

export default MapSection
