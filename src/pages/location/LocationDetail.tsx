import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapLocationDot,
  faImages,
  faFilm,
  faCircleInfo,
  faMagnifyingGlassLocation,
} from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-grid-carousel'
import { Map } from 'leaflet'

import { useAppContext } from '@/providers/AppContextProvider'
import { LocationData } from '@/interfaces'
import Cover from '@/components/Cover'
import YoutubePlayer from '@/components/YoutubePlayer'
import Footer from '@/components/Footer'
import { initMap, setMaker } from '@/utils/leaflet'
import Gallery from './Gallery'

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto 50px;
  padding: 0 15px;

  @media screen and (max-width: 1300px) {
    max-width: 1000px;
  }

  @media screen and (max-width: 480px) {
    padding: 0;
    margin: 0;
  }
`

const Header = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const LocationNameContainer = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  font-size: 32px;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }

  @media screen and (max-width: 480) {
    font-size: 24px;
  }
`

const MapPositionStyle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`

const MapContainer = styled.div`
  position: sticky;
  top: 10vh;
  height: 80vh;
  width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 3px;

  @media screen and (max-width: 1300px) {
    width: 100%;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column-reverse;
  }
`

const ItemListContainer = styled.div`
  border-left: 3px solid #ff4949;
  padding-left: 3px;
  padding-bottom: 3px;

  > label {
    display: inline-block;
    background: #ff4949;
    color: #fff;
    font-size: 20px;
    padding: 4px 12px;
    margin: 0 0 3px -3px;
  }
`

const ExploreBtn = styled.div`
  background: #ff4949;
  color: #fff;
  font-size: 20px;
  padding: 4px 12px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  :hover {
    background: #ff2121;
  }

  @media screen and (max-width: 480px) {
    align-self: unset;
    justify-content: center;
  }
`

interface LocationDetailProps {
  type: 'video' | 'photo'
}

const sortItemDate = (a: any, b: any) =>
  new Date(b.date).valueOf() - new Date(a.date).valueOf()

const LocationDetail: FC<LocationDetailProps> = ({ type }) => {
  const { locationId } = useParams()
  const { state } = useLocation()
  const itemId = state?.itemId
  const navigate = useNavigate()
  const { locationList } = useAppContext()
  const [targetLocation, setTargetLocation] = useState<
    LocationData | undefined | null
  >(undefined)
  const photoList = useMemo(() => {
    return (targetLocation?.photoList || []).sort(sortItemDate)
  }, [targetLocation])
  const videoList = useMemo(() => {
    return (targetLocation?.videoList || []).sort(sortItemDate)
  }, [targetLocation])

  useEffect(() => {
    if (locationId && locationList.length) {
      const target = locationList.find(
        (data) => data.location.id === locationId
      )
      setTargetLocation(target || null)
    }
  }, [locationId, locationList])

  useEffect(() => {
    if (targetLocation === null) {
      alert('Page not found.')
      navigate('/')
    }

    if (targetLocation) {
      const map = initMap({
        eleId: 'LeafletMapContainer',
        zoom: 18,
        viewCenter: [targetLocation.location.lat, targetLocation.location.lng],
      })

      setMaker(
        map as Map,
        targetLocation.location.lat,
        targetLocation.location.lng
      )
    }
  }, [targetLocation])

  const navigateToListPage = () => {
    navigate(`/${type[0]}`)
  }

  return (
    <>
      <Cover />
      {targetLocation && (
        <Container>
          <Header>
            <div
              css={{
                position: 'absolute',
                bottom: '35px',
                left: '-15px',
                height: '20px',
                width: '400px',
                maxWidth: '100vw',
                background: '#ffff5d',
              }}
            />
            <LocationNameContainer>
              <FontAwesomeIcon icon={faMapLocationDot} color="#ff4949" />
              <h1>{targetLocation?.location.name}</h1>
            </LocationNameContainer>
            <a
              href={`https://www.google.com/maps/@${targetLocation?.location.lat},${targetLocation?.location.lng},20z`}
              rel="noopener noreferrer"
              target="_blank"
              css={{
                position: 'relative',
                marginLeft: '60px',
                fontSize: '12px',
                color: '#000',
              }}
            >
              在 Google Maps 上查看
            </a>
          </Header>
          <MapPositionStyle>
            <div
              css={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div
                css={{
                  display: 'flex',
                  flexDirection: type === 'photo' ? 'column' : 'column-reverse',
                  gap: '16px',
                }}
              >
                {!!photoList.length && (
                  <ItemListContainer>
                    <label>
                      <FontAwesomeIcon icon={faImages} color="#fff" />
                    </label>

                    <Gallery
                      selectedId={itemId}
                      imageList={photoList.map(({ id, image }) => ({
                        id,
                        url: image,
                      }))}
                    />
                  </ItemListContainer>
                )}
                {!!videoList.length && (
                  <ItemListContainer>
                    <label>
                      <FontAwesomeIcon icon={faFilm} color="#fff" />
                    </label>
                    {videoList.length > 1 ? (
                      <Carousel
                        cols={1}
                        rows={1}
                        gap={0}
                        mobileBreakpoint={768}
                        loop
                      >
                        {videoList.map(({ youtubeId }) => (
                          <Carousel.Item key={youtubeId}>
                            <YoutubePlayer id={youtubeId} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    ) : (
                      videoList.map(({ youtubeId }) => (
                        <YoutubePlayer id={youtubeId} />
                      ))
                    )}
                  </ItemListContainer>
                )}
              </div>
              {targetLocation?.location.desc && (
                <ItemListContainer>
                  <label>
                    <FontAwesomeIcon icon={faCircleInfo} color="#fff" />
                  </label>
                  <pre>{targetLocation?.location.desc}</pre>
                </ItemListContainer>
              )}
            </div>
            <MapContainer>
              <ExploreBtn onClick={navigateToListPage}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlassLocation}
                  color="#fff"
                />
                探索其他地點
              </ExploreBtn>
              <div
                id="LeafletMapContainer"
                style={{ height: '100%', width: '100%' }}
              />
            </MapContainer>
          </MapPositionStyle>
        </Container>
      )}
      <Footer />
    </>
  )
}

export default LocationDetail
