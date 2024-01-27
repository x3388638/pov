import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return <div>404</div>
}

export default NotFound
