import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import { MOCK_PINNED_PHOTO_LIST } from './constants'
import { keyframes } from '@emotion/react'

const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
  height: 250px;
  max-height: 70vh;
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

const moreBtnKeyframes = keyframes`
  from { 
    transform: translateX(0);
    opacity: 0 
  }
  
  to { 
    transform: translateX(-5vw);
    opacity: 1 
  }
`

const moreBtnArrowKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(5px);
  }

  40% {
    transform: translateX(0);
  }
`

const MoreBtn = styled.div`
  display: inline-flex;
  gap: 12px;
  padding: 18px 50px;
  background: #f37d6d;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;
  box-shadow: rgba(7, 7, 7, 0.5) 0px 5px 5px 0px;
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
  animation: ${moreBtnKeyframes} 1s cubic-bezier(0, 0, 0.2, 1) 0.5s forwards;

  &:hover {
    background: #d66d5f;
  }

  @media screen and (max-width: 480px) {
    position: relative;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
    box-shadow: unset;
    animation: unset;
    opacity: 1;
    right: unset;
    bottom: unset;
  }
`

const PhotoSection = () => {
  const handleClickImg = () => {
    console.log('TODO')
  }

  return (
    <div css={{ position: 'relative' }}>
      <Carousel>
        {/* FIXME: get img list */}
        {MOCK_PINNED_PHOTO_LIST.map((src, i) => (
          <ImgContainer key={i} onClick={handleClickImg}>
            <img src={src} />
          </ImgContainer>
        ))}
      </Carousel>
      <MoreBtn>
        <span>更多照片</span>
        <span
          css={{
            animation: `${moreBtnArrowKeyframes} 2s ease-in-out 1s infinite alternate forwards;`,
          }}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </span>
      </MoreBtn>
    </div>
  )
}

export default PhotoSection
