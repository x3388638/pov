// ref: https://github.com/vercel/next.js/issues/4957#issuecomment-413841689

import { forwardRef } from 'react'
import dynamic from 'next/dynamic'

import { LeafletMap } from '@/utils/leaflet'
import { MapSectionProps } from './map-section'
const MapSection = dynamic(() => import('./map-section'), {
  ssr: false,
})

const WrappedMapSection = forwardRef<
  LeafletMap | undefined,
  Omit<MapSectionProps, 'forwardedRef'>
>((props, ref) => <MapSection {...props} forwardedRef={ref} />)

export default WrappedMapSection
