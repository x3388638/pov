import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import shuffle from 'lodash.shuffle'

import { LocationData, Photo } from '@/interfaces'
import { useAppContext } from '@/providers/app-context'
import Loading from '@/components/loading'
import { PHOTO_SECTION_ITEM_COUNT } from '@/constants'
import MoreBtn from './more-btn'

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

const Image: FC<{ photo: Photo }> = ({ photo }) => {
  const { id, image, resolution: { height = 3, width = 4 } = {} } = photo
  const [showImg, setShowImg] = useState(false)
  const placeholderRef = useRef(null)

  useEffect(() => {
    if (id != undefined) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0) {
          setShowImg(true)
          observer.disconnect()
        }
      })

      observer.observe(placeholderRef.current!)
    }
  }, [id])

  return (
    <div
      ref={placeholderRef}
      style={{
        position: 'relative',
        height: '100%',
        aspectRatio: `${width}/${height}`,
        background: '#f3f3f3',
      }}
    >
      {showImg ? (
        <img
          src={image}
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}

const PhotoSection: FC = () => {
  const { locationList, setLocationPageTarget } = useAppContext()
  const router = useRouter()
  const [photoList, setPhotoList] = useState<Photo[]>(
    [...Array(PHOTO_SECTION_ITEM_COUNT)].map(() => ({} as Photo))
  )

  useEffect(() => {
    initPhotoList(locationList)
  }, [locationList])

  const initPhotoList = (locationList: LocationData[]) => {
    if (!locationList.length) {
      return
    }

    const pinned: Photo[] = []
    const nonPinned: Photo[] = []
    const result: Photo[] = []

    locationList.forEach(({ photoList }) => {
      photoList?.forEach((photo) => {
        if (!photo.image) {
          return
        }

        if (photo.pinned) {
          pinned.push(photo)
        } else {
          nonPinned.push(photo)
        }
      })
    })

    result.push(...shuffle(pinned).slice(0, PHOTO_SECTION_ITEM_COUNT))
    if (result.length < PHOTO_SECTION_ITEM_COUNT) {
      result.push(
        ...shuffle(nonPinned).slice(0, PHOTO_SECTION_ITEM_COUNT - result.length)
      )
    }

    setPhotoList(result)
  }

  const handleClickImg = (photo: Photo) => {
    const { location, id } = photo || {}

    if (!id) {
      return
    }

    setLocationPageTarget(id)
    router.push(`/p/${location.id}`)
  }

  return (
    <div style={{ position: 'relative' }}>
      <Carousel>
        {photoList.map((photo, i) => (
          <ImgContainer key={i} onClick={() => handleClickImg(photo)}>
            <Image photo={photo} />
          </ImgContainer>
        ))}
      </Carousel>
      <MoreBtn label="更多照片" animationDelay={0.5} href="/p" />
    </div>
  )
}

export default PhotoSection
