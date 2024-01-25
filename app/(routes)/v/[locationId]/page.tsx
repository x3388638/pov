import type { Metadata } from 'next'

import LocationDetail from '@/pages/location-detail'
import { genMetadata } from '@/utils/metadata'
import { genBreadcrumb } from '@/utils/jsonLd'
import { getLocationById, normalizeEntryList } from '@/utils/contentful'
import contentfulEntries from '@public/contentfulEntries.json'

const locationList = normalizeEntryList(contentfulEntries as any)

interface Props {
  params: {
    locationId?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationId } = params
  const { location } = getLocationById(locationList, locationId || '') || {}

  return genMetadata('LocationDetail', locationId, {
    locationName: location?.name,
  })
}

const Page = ({ params }: Props) => {
  const { location } =
    getLocationById(locationList, params.locationId || '') || {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: genBreadcrumb(3, 'video', location?.name),
        }}
      />
      <LocationDetail type="video" />
    </>
  )
}

export default Page
