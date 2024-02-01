'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

import Loading from '@/components/loading'
import { useAppContext } from '@/providers/app-context'
import { getLocationAndYoutubeIdByRedirectId } from '@/utils/contentful'

const YoutubeRedirect: FC = () => {
  const { id = '' } = useParams()
  const { locationList } = useAppContext()
  const router = useRouter()
  const [youtubeId, setYoutubeId] = useState<string | null | undefined>(
    undefined
  )
  const coverImg = useMemo(() => {
    if (!youtubeId) {
      return undefined
    }

    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  }, [youtubeId])

  useEffect(() => {
    if (locationList?.length && id) {
      const { youtubeId = null } = getLocationAndYoutubeIdByRedirectId(
        locationList,
        id as string
      )

      setYoutubeId(youtubeId)
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
      {youtubeId && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: '24px', padding: '20px' }}>
            正在導向至 YouTube...
          </div>
          <div
            style={{
              position: 'relative',
            }}
          >
            <img src={coverImg} style={{ width: '100%', maxWidth: '800px' }} />
            <Loading />
          </div>
        </div>
      )}
    </>
  )
}

export default YoutubeRedirect
