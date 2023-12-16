import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MainImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

const ImgList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;

  @container (width < 800px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`

const Thumbnail = styled.img<{ active: boolean }>`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  cursor: pointer;
  filter: ${({ active }) => `brightness(${active ? '1' : '0.6'})`};
  background: #fafafa;

  @media screen and (max-width: 480px) {
    filter: unset;
    aspect-ratio: unset;
    cursor: auto;
  }
`

interface GalleryProps {
  selectedId?: string
  imageList: {
    id: string
    url: string
  }[]
}

const Gallery: FC<GalleryProps> = ({ selectedId, imageList }) => {
  const [selectedImg, setSelectedImg] = useState(imageList[0])

  useEffect(() => {
    setSelectedImg(
      (selectedId && imageList.find(({ id }) => id === selectedId)) ||
        imageList[0]
    )
  }, [selectedId, imageList])

  const select = (targetId: string) => {
    setSelectedImg(imageList.find(({ id }) => id === targetId)!)
  }

  return (
    <Container>
      <MainImgContainer>
        <img
          src={selectedImg.url}
          css={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </MainImgContainer>
      <ImgList>
        {imageList.map(({ id, url }) => (
          <Thumbnail
            key={id}
            id={id}
            src={url}
            active={id === selectedImg.id}
            onClick={() => select(id)}
          />
        ))}
      </ImgList>
    </Container>
  )
}

export default Gallery
