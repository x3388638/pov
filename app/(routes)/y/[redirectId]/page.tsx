import { FC } from 'react'

const Page: FC<{ params: { redirectId?: string } }> = ({
  params: { redirectId },
}) => {
  return <div>redirectId: {redirectId}</div>
}

export default Page
