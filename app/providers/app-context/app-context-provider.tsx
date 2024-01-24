'use client'

import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { LocationData } from '@/interfaces'
import { normalizeEntryList } from '@/utils/contentful'

interface AppContext {
  locationList: LocationData[]
  locationPageTarget?: string
  setLocationPageTarget: Dispatch<SetStateAction<string | undefined>>
}

const ctx = createContext({} as AppContext)

export const useAppContext = () => {
  return useContext(ctx)
}

const { Provider } = ctx

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locationList, setLocationList] = useState<LocationData[]>([])
  const [locationPageTarget, setLocationPageTarget] = useState<string>()

  useEffect(() => {
    fetch('/contentfulEntries.json', {
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocationList(normalizeEntryList(data))
      })
  }, [])

  return (
    <Provider
      value={{ locationList, locationPageTarget, setLocationPageTarget }}
    >
      {children}
    </Provider>
  )
}
