import type { Metadata } from 'next'

import YoutubeRedirect from '@/pages/youtube-redirect'
import { genMetadata } from '@/utils/metadata'
import {
  getLocationAndYoutubeIdByRedirectId,
  normalizeEntryList,
} from '@/utils/contentful'
import contentfulEntries from '@assets/contentfulEntries.json'

const locationList = normalizeEntryList(contentfulEntries as any)

export async function generateMetadata({
  params,
}: {
  params: { id?: string }
}): Promise<Metadata> {
  const { id } = params
  const { location, youtubeId } = getLocationAndYoutubeIdByRedirectId(
    locationList,
    id || ''
  )

  return genMetadata('YoutubeRedirect', id, {
    locationName: location?.location.name,
    youtubeId,
  })
}

const Page = () => {
  return <YoutubeRedirect />
}

export default Page
