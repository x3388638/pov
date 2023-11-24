import React from 'react'
import { useParams } from 'react-router-dom'

const YoutubeRedirect = () => {
  const { id } = useParams()

  return <div>{id}</div>
}

export default YoutubeRedirect
