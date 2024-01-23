import { FC } from 'react'

const Page: FC<{ params: { locationId?: string } }> = ({
  params: { locationId },
}) => {
  return <div>video location {locationId}</div>
}

export default Page
