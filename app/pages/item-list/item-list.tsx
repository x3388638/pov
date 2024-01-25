'use client'

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import {
  faPhotoFilm,
  faShuffle,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAppContext } from '@/providers/app-context'
import { ItemType, LocationData } from '@/interfaces'
import { LeafletMap } from '@/utils/leaflet'
import Filter from './filter'
import { ItemFilter } from './interfaces'
import { PAGE_ITEM_COUNT, config } from './constants'
import { filterItemList } from './utils'

const Container = styled.div<{ $maxWidth: string }>`
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
  margin: 0 auto;
  padding: 20px;
  flex: 1;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  font-size: 32px;
  padding: 20px 0;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    font-size: 28px;
    padding: 20px 0px 20px 20px;
  }

  @media screen and (max-width: 480px) {
    font-size: 24px;
  }
`

const ExploreBtn = styled.div`
  position: fixed;
  right: 0;
  bottom: 50px;
  font-size: 18px;
  background: #dc8686;
  color: #fff;
  padding: 8px 12px;
  display: flex;
  gap: 8px;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background: #b06161;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 4px 8px;
  }
`

const MapPositionLayout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }
`

const MapContainer = styled.div`
  position: sticky;
  top: 10vh;
  width: 500px;
  height: 80vh;
  z-index: 2;

  @media screen and (max-width: 1300px) {
    width: 100%;
    height: 30vh;
    top: 0;
  }
`

const ItemContainer = styled.div`
  background: #fafafa;
  border-left: 20px solid #f0dbaf;
  padding: 10px;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1) 0s;
  cursor: pointer;

  &:hover {
    transform: translate3d(0px, -5px, 0px);
    box-shadow: rgba(7, 7, 7, 0.5) 0px 5px 5px 0px;
  }

  @media screen and (max-width: 480px) {
    &:hover {
      transform: unset;
      box-shadow: unset;
    }
  }
`

const ThumbnailRail = styled.div`
  white-space: nowrap;
  overflow: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & > div + div {
    margin-left: 4px;
  }
`

interface ItemListProps {
  type: ItemType
}

interface InfiniteScrollTriggerProps {
  onTrigger: () => void
}

interface ThumbnailProps {
  imgSrc: string
  width: string
}

const Thumbnail: FC<ThumbnailProps> = ({ imgSrc, width }) => {
  const [showImg, setShowImg] = useState(false)
  const eleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        setShowImg(true)
        observer.disconnect()
      }
    })

    observer.observe(eleRef.current!)
  }, [])

  return (
    <div
      ref={eleRef}
      style={{
        display: 'inline-block',
        aspectRatio: '1/1',
        scrollSnapAlign: 'center',
        maxHeight: '80vh',
        backgroundColor: '#eee',
        width,
        ...(showImg && {
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
      }}
    />
  )
}

const InfiniteScrollTrigger: FC<InfiniteScrollTriggerProps> = ({
  onTrigger,
}) => {
  const eleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        onTrigger()
      }
    })

    observer.observe(eleRef.current!)

    return () => {
      observer.disconnect()
    }
  }, [onTrigger])

  return <div ref={eleRef}></div>
}

const ItemList: FC<ItemListProps> = ({ type }) => {
  const { locationList } = useAppContext()
  const router = useRouter()
  const { title, itemListKey, containerMaxWidth, metaTitle } = useMemo(
    () => config[type],
    [type]
  )
  const [sortedList, setSortedList] = useState<LocationData[]>([])
  const [availableTagList, setAvailableTagList] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<ItemFilter>()
  const [filteredItemList, setFilteredItemList] = useState<LocationData[]>([])
  const [revealedItemList, setRevealedItemList] = useState<LocationData[]>([])
  const mapRef = useRef<LeafletMap>()
  const mouseEnterTimeoutRef = useRef<number>()

  // re-init map on type change
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new LeafletMap({ eleId: 'LeafletMapContainer' })
    }
  }, [type])

  useEffect(() => {
    if (locationList.length) {
      const list: LocationData[] = []
      const tagList: string[] = []
      locationList.forEach((locationData: LocationData) => {
        const itemList = locationData[itemListKey]
        if (!itemList.length) {
          return
        }

        itemList.forEach(({ tags }) => {
          tagList.push(...(tags || []))
        })

        list.push({
          ...locationData,
          [itemListKey]: itemList.sort(
            (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
          ),
        })
      })

      setSortedList(
        list.sort(
          (a, b) =>
            new Date(b[itemListKey][0].date).valueOf() -
            new Date(a[itemListKey][0].date).valueOf()
        )
      )

      setAvailableTagList([...new Set(tagList)].sort())
    }
  }, [locationList, itemListKey])

  useEffect(() => {
    setFilteredItemList(filterItemList(sortedList, itemListKey, filter))
    setPage(1)
  }, [filter, sortedList, itemListKey])

  useEffect(() => {
    setRevealedItemList(filteredItemList.slice(0, page * PAGE_ITEM_COUNT))
  }, [page, filteredItemList])

  // when filters are changed, reset markers and fly to first location
  useEffect(() => {
    setMarkers(filteredItemList)

    const { location } = filteredItemList[0] || {}

    if (location) {
      mapRef.current?.map.flyTo([location.lat, location.lng], 8, {
        duration: 1,
      })
    }
  }, [filteredItemList])

  const setMarkers = (list: LocationData[]) => {
    if (mapRef.current) {
      mapRef.current.clearAllMarkers()
      list.forEach(({ location }) => {
        const { lat, lng, id, name } = location

        mapRef.current?.setMarker(lat, lng, {
          content: renderToString(
            <a href={`/${type === 'photo' ? 'p' : 'v'}/${id}`} target="_blank">
              {name} <FontAwesomeIcon icon={faUpRightFromSquare} />
            </a>
          ),
        })
      })
    }
  }

  const focusToMarker = (location: LocationData['location']) => {
    clearTimeout(mouseEnterTimeoutRef.current)
    mouseEnterTimeoutRef.current = window.setTimeout(() => {
      const { lat, lng } = location
      mapRef.current?.map.flyTo([lat, lng], 16, { duration: 1 })
    }, 1500)
  }

  const handleFilterChange = (list: string[], logic: 'AND' | 'OR') => {
    if (!list.length) {
      setFilter(undefined)
    } else {
      setFilter({
        tags: list,
        logic,
      })
    }
  }

  const loadNextPage = useCallback(() => {
    if (revealedItemList.length < filteredItemList.length) {
      setPage((p) => p + 1)
    }
  }, [revealedItemList, filteredItemList])

  const handleSwitchType = () => {
    window.scrollTo(0, 0)
    router.push(`/${type === 'photo' ? 'v' : 'p'}`)
  }

  return (
    <Container key={type} $maxWidth={containerMaxWidth}>
      <ExploreBtn onClick={handleSwitchType}>
        <FontAwesomeIcon icon={faShuffle} />
        <span>看{type === 'photo' ? '影片' : '照片'}</span>
      </ExploreBtn>
      <TitleContainer>
        <div
          style={{
            position: 'absolute',
            top: '35px',
            left: '-20px',
            height: '20px',
            width: '450px',
            maxWidth: '80vw',
            background: '#ffff5d',
          }}
        />
        <FontAwesomeIcon
          icon={faPhotoFilm}
          color="#ff4949"
          style={{ position: 'relative' }}
        />
        <span style={{ position: 'relative' }}>{title}</span>
      </TitleContainer>
      <div style={{ margin: '12px 0' }}>
        <Filter tagList={availableTagList} onSelect={handleFilterChange} />
      </div>
      <MapPositionLayout>
        <MapContainer>
          <div
            id="LeafletMapContainer"
            style={{ height: '100%', width: '100%' }}
          />
        </MapContainer>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {revealedItemList.map(({ location, videoList, photoList }) => (
            <ItemContainer
              key={location.id}
              onClick={() => router.push(`/${type[0]}/${location.id}`)}
              onMouseEnter={() => focusToMarker(location)}
              onMouseLeave={() => clearTimeout(mouseEnterTimeoutRef.current)}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                {location.name}
              </div>
              {type === 'photo' && (
                <ThumbnailRail>
                  {photoList.map(({ image }, i) => (
                    <Thumbnail
                      key={i}
                      imgSrc={image}
                      width={photoList.length > 1 ? '60%' : '100%'}
                    />
                  ))}
                </ThumbnailRail>
              )}
              {type === 'video' && (
                <div>
                  {videoList.map(({ youtubeId }, i) => (
                    <img
                      key={i}
                      src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                      width="100%"
                    />
                  ))}
                </div>
              )}
            </ItemContainer>
          ))}
          {!!revealedItemList.length && (
            <InfiniteScrollTrigger onTrigger={loadNextPage} />
          )}
        </div>
      </MapPositionLayout>
    </Container>
  )
}

export default ItemList
