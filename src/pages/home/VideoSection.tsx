import { FC, useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'
import styled from '@emotion/styled'
import shuffle from 'lodash.shuffle'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '@/providers/AppContextProvider'
import { LocationData, Video } from '@/interfaces'
import { VIDEO_SECTION_ITEM_COUNT } from './constants'
import YoutubePlayer from '@/components/YoutubePlayer'
import MoreBtn from './MoreBtn'

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
  const navigate = useNavigate()
  const [videoList, setVideoList] = useState<Video[]>([])

  useEffect(() => {
    initVideoList(locationList)
  }, [locationList])

  const initVideoList = (locationList: LocationData[]) => {
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
          autoplay={5000}
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
          {videoList.map(({ youtubeId }) => (
            <Carousel.Item key={youtubeId}>
              <div
                css={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  background: '#888',
                }}
              >
                <div
                  css={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <YoutubePlayer id={youtubeId} />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselContainer>
      <MoreBtn
        label="更多影片"
        animationDelay={1.5}
        onClick={() => navigate('/v')}
      />
    </Container>
  )
}

export default VideoSection
