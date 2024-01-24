'use client'

import { FC } from 'react'

import { useAppContext } from '@/providers/app-context'

const Page: FC<{ params: { locationId?: string } }> = ({
  params: { locationId },
}) => {
  const { locationPageTarget } = useAppContext()

  return (
    <div>
      photo; id: {locationId}; target: {locationPageTarget}
    </div>
  )
}

export default Page
