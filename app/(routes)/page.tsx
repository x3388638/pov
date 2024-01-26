import type { Metadata } from 'next'

import HomePage from '@/pages/home'
import { genMetadata } from '@/utils/metadata'

export const metadata: Metadata = genMetadata()

const Page = () => {
  return <HomePage />
}

export default Page
