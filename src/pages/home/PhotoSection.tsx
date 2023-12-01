import { FC } from 'react'
import styled from '@emotion/styled'

import { MOCK_PINNED_PHOTO_LIST } from './constants'
import MoreBtn from './MoreBtn'

const Carousel = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  gap: 8px;
  padding: 10px 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 480px) {
    scroll-snap-type: x mandatory;
    padding: 0;
    gap: 0;
  }
`

const ImgContainer = styled.div`
  display: inline-flex;
  height: 40vh;
  max-height: calc(100vw / 16 * 9);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;
  cursor: pointer;

  &:hover {
    transform: translate3d(0px, -5px, 0px);
    box-shadow: rgba(7, 7, 7, 0.5) 0px 5px 5px 0px;
  }

  @media screen and (max-width: 480px) {
    scroll-snap-align: center;

    &:hover {
      transform: unset;
      box-shadow: unset;
    }
  }
`

const PhotoSection: FC = () => {
  const handleClickImg = () => {
    console.log('TODO')
  }

  const handleClickMore = () => {
    console.log('TODO')
  }

  return (
    <div css={{ position: 'relative' }}>
      <Carousel>
        {/* FIXME: get img list */}
        {MOCK_PINNED_PHOTO_LIST.map((src, i) => (
          <ImgContainer key={i} onClick={handleClickImg}>
            <img src={src} height="100%" />
          </ImgContainer>
        ))}
      </Carousel>
      <MoreBtn
        label="更多照片"
        animationDelay={0.5}
        onClick={handleClickMore}
      />
    </div>
  )
}

export default PhotoSection
