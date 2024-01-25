'use client'

import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

import { LocationData } from '@/interfaces'
import { normalizeEntryList } from '@/utils/contentful'
import contentfulEntries from '@public/contentfulEntries.json'

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
  const locationList = useMemo<LocationData[]>(
    () => normalizeEntryList(contentfulEntries as any),
    []
  )
  const [locationPageTarget, setLocationPageTarget] = useState<string>()

  return (
    <Provider
      value={{ locationList, locationPageTarget, setLocationPageTarget }}
    >
      {children}
    </Provider>
  )
}
