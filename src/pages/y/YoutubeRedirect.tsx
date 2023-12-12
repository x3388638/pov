import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Cover from '@/components/Cover'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

const YoutubeRedirect: FC = () => {
  const { id } = useParams()

  useEffect(() => {
    setTimeout(() => {
      location.href = `https://youtu.be/${id}`
    }, 2000 + Math.round(Math.random() * 1000))
  }, [])

  return (
    <div css={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Cover />
      <div
        css={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div css={{ fontSize: '24px', padding: '20px' }}>
          正在導向至 YouTube...
        </div>
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          css={{ width: '100%', maxWidth: '800px' }}
        />
        <Loading />
      </div>
      <Footer />
    </div>
  )
}

export default YoutubeRedirect
