import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Carousel from 'react-grid-carousel'
import styled from 'styled-components'
import shuffle from 'lodash.shuffle'

import { useAppContext } from '@/providers/app-context'
import { LocationData, Video } from '@/interfaces'
import { VIDEO_SECTION_ITEM_COUNT } from '@/constants'
import YoutubePlayer from '@/components/youtube-player'
import Loading from '@/components/loading'
import MoreBtn from './more-btn'

const Container = styled.div`
  position: relative;
  background: #f3f3f3;
  padding: 10px 0;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

const CarouselContainer = styled.div`
  @media screen and (max-width: 900px) {
    max-width: calc(100vh / 9 * 16);
    margin: 0 auto;
  }
`

const VideoSection: FC = () => {
  const { locationList } = useAppContext()
  const router = useRouter()
  const [videoList, setVideoList] = useState<Video[]>(
    [...Array(VIDEO_SECTION_ITEM_COUNT)].map(() => ({} as Video))
  )

  useEffect(() => {
    initVideoList(locationList)
  }, [locationList])

  const initVideoList = (locationList: LocationData[]) => {
    if (!locationList.length) {
      return
    }

    const pinned: Video[] = []
    const nonPinned: Video[] = []
    const result: Video[] = []

    locationList.forEach(({ videoList }) => {
      videoList.forEach((video) => {
        if (video.pinned) {
          pinned.push(video)
        } else {
          nonPinned.push(video)
        }
      })
    })

    result.push(...shuffle(pinned).slice(0, VIDEO_SECTION_ITEM_COUNT))
    if (result.length < VIDEO_SECTION_ITEM_COUNT) {
      result.push(
        ...shuffle(nonPinned).slice(0, VIDEO_SECTION_ITEM_COUNT - result.length)
      )
    }

    setVideoList(result)
  }

  return (
    <Container>
      <CarouselContainer>
        <Carousel
          cols={3}
          rows={1}
          gap={10}
          mobileBreakpoint={768}
          loop
          responsiveLayout={[
            {
              breakpoint: 900,
              cols: 1,
            },
            {
              breakpoint: 1400,
              cols: 2,
            },
          ]}
        >
          {videoList.map(({ youtubeId }, i) => (
            <Carousel.Item key={i}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  background: '#888',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {youtubeId != undefined ? (
                    <YoutubePlayer id={youtubeId} />
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselContainer>
      <MoreBtn label="更多影片" animationDelay={1.5} href="/v" />
    </Container>
  )
}

export default VideoSection
