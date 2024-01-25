'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

import Loading from '@/components/loading'
import { useAppContext } from '@/providers/app-context'
// FIXME:
// import Helmet from '@/components/Helmet'

// FIXME: no index?
import { LocationData } from '@/interfaces'

const YoutubeRedirect: FC = () => {
  const { id = '' } = useParams()
  const { locationList } = useAppContext()
  const router = useRouter()
  const [youtubeId, setYoutubeId] = useState<string | null | undefined>(
    undefined
  )
  const [targetLocation, setTargetLocation] = useState<LocationData>()
  // FIXME:
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
      router.push('/')
    }
  }, [youtubeId])

  return (
    <>
      {/* // FIXME: */}
      {/* <Helmet title={metaTitle} image={coverImg} /> */}

      {youtubeId && (
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '24px', padding: '20px' }}>
            正在導向至 YouTube...
          </div>
          <img src={coverImg} style={{ width: '100%', maxWidth: '800px' }} />
          <Loading />
        </div>
      )}
    </>
  )
}

export default YoutubeRedirect
