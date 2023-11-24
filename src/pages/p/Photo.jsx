import React from 'react'
import { useParams } from 'react-router-dom'

const Photo = () => {
  const { id } = useParams()

  return <div>/p{ id? `/${id}` : null }</div>
}

export default Photo
