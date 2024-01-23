import { FC } from 'react'

const Page: FC<{ params: { locationId?: string } }> = ({
  params: { locationId },
}) => {
  return <div>photo {locationId}</div>
}

export default Page
