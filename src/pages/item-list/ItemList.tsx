import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import Cover from '@/components/Cover'
import Footer from '@/components/Footer'
import { useAppContext } from '@/providers/AppContextProvider'
import { LocationData } from '@/interfaces'
import Filter from './Filter'
import { ItemType } from './interfaces'
import { PAGE_ITEM_COUNT, config } from './constants'

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
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
`

const ThumbnailRail = styled.div`
  height: 300px;
  white-space: nowrap;
  overflow: auto;
  display: flex;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Thumbnail = styled.img`
  height: 100%;
  display: flex-inline;
`

interface ItemListProps {
  type: ItemType
}

const ItemList: FC<ItemListProps> = ({ type }) => {
  const { locationList } = useAppContext()
  const navigate = useNavigate()
  const { title, itemListKey } = useMemo(() => config[type], [type])
  const [sortedList, setSortedList] = useState<LocationData[]>([])
  const [availableTagList, setAvailableTagList] = useState<string[]>([])
  const [page, setPage] = useState(1)
  // TODO: infinite scroll
  const [revealedItemList, setRevealedItemList] = useState<LocationData[]>([])

  useEffect(() => {
    if (locationList.length) {
      const list: LocationData[] = []
      const tagList: string[] = []
      locationList.forEach((locationData) => {
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
    setRevealedItemList(sortedList.slice(0, page * PAGE_ITEM_COUNT))
  }, [page, sortedList])

  const handleFilterChange = (list: string[], logic: 'AND' | 'OR') => {
    // TODO
    console.log({ list, logic })
  }

  return (
    <>
      <Cover />
      <Container>
        <div>{title}</div>
        <div css={{ margin: '12px 0' }}>
          <Filter tagList={availableTagList} onSelect={handleFilterChange} />
        </div>
        <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {revealedItemList.map(({ location, videoList, photoList }) => (
            <ItemContainer
              key={location.id}
              onClick={() => navigate(`/${type[0]}/${location.id}`)}
            >
              <div
                css={{
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
                    <Thumbnail key={i} src={image} />
                  ))}
                </ThumbnailRail>
              )}
              {type === 'video' && (
                <div>{videoList.map(({ youtubeId }) => youtubeId)}</div>
              )}
            </ItemContainer>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default ItemList
