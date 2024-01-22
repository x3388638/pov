import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Cover from '@/components/Cover'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import { useAppContext } from '@/providers/AppContextProvider'
import Helmet from '@/components/Helmet'
import { LocationData } from '@/interfaces'

const YoutubeRedirect: FC = () => {
  const { id = '' } = useParams()
  const { locationList } = useAppContext()
  const navigate = useNavigate()
  const [youtubeId, setYoutubeId] = useState<string | null | undefined>(
    undefined
  )
  const [targetLocation, setTargetLocation] = useState<LocationData>()
  const metaTitle = useMemo(() => {
    const locationName = targetLocation?.location?.name
    if (!locationName) {
      return undefined
    }

    return `前往 YouTube 觀看 ${locationName} 影片`
  }, [targetLocation])
  const coverImg = useMemo(() => {
    if (!youtubeId) {
      return undefined
    }

    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }, [youtubeId])

  useEffect(() => {
    if (locationList?.length && id) {
      let result = null
      const location = locationList.find(({ videoList }) => {
        const targetVideo = (videoList || []).find(
          ({ redirectId }) => String(redirectId) === id
        )

        if (targetVideo) {
          result = targetVideo.youtubeId
          return true
        }

        return false
      })

      setTargetLocation(location)
      setYoutubeId(result)
    }
  }, [locationList, id])

  useEffect(() => {
    if (youtubeId) {
      setTimeout(() => {
        location.href = `https://youtu.be/${youtubeId}`
      }, 2000 + Math.round(Math.random() * 1000))
    } else if (youtubeId === null) {
      alert('Corresponding YouTube video not found.')
      navigate('/')
    }
  }, [youtubeId])

  return (
    <div css={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Helmet title={metaTitle} image={coverImg} />
      <Cover />
      {youtubeId && (
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
          <img src={coverImg} css={{ width: '100%', maxWidth: '800px' }} />
          <Loading />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default YoutubeRedirect
