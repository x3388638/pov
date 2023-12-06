import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { LocationData } from '@/interfaces'

interface AppContext {
  locationList: LocationData[]
}

const ctx = createContext({} as AppContext)

export const useAppContext = () => {
  return useContext(ctx)
}

const { Provider } = ctx

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locationList, setLocationList] = useState<LocationData[]>([])

  useEffect(() => {
    fetch('/contentfulEntries.json', {})
      .then((res) => res.json())
      .then((data) => {
        setLocationList(data)
      })
  }, [])

  return <Provider value={{ locationList }}>{children}</Provider>
}

export default AppContextProvider
