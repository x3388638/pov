import { FC } from 'react'
import Carousel from 'react-grid-carousel'
import styled from '@emotion/styled'

import { FEATURED_YT_LIST } from './constants'
import YoutubePlayer from './YoutubePlayer'
import MoreBtn from './MoreBtn'

const Container = styled.div`
  position: relative;
  background: #f3f3f3;
  padding: 40px 0;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`

const CarouselContainer = styled.div`
  @media screen and (max-width: 900px) {
    max-width: 650px;
    margin: 0 auto;
  }
`

const VideoSection: FC = () => {
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
          {FEATURED_YT_LIST.map((id) => (
            <Carousel.Item key={id}>
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
                  <YoutubePlayer id={id} />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselContainer>
      <MoreBtn
        label="更多影片"
        animationDelay={1.5}
        onClick={() => {
          console.log('TODO')
        }}
      />
    </Container>
  )
}

export default VideoSection
