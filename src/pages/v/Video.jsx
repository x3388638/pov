import React from 'react'
import { useParams } from 'react-router-dom'

const Video = () => {
  const { id } = useParams()

  return <div>/v{id ? `/${id}` : null}</div>
}

export default Video
