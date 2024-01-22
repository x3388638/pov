import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import 'reset-css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'

import './style.css'
import Home from './pages/home'
import YoutubeRedirect from './pages/y'
import AppContextProvider from './providers/AppContextProvider'
import LocationDetail from './pages/location'
import ItemList from './pages/item-list'
import NotFound from './pages/not-found'

const container = document.getElementById('app')
const root = createRoot(container!)

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/p',
    element: <ItemList type="photo" />,
  },
  {
    path: '/p/:locationId',
    element: <LocationDetail type="photo" />,
  },
  {
    path: '/v',
    element: <ItemList type="video" />,
  },
  {
    path: '/v/:locationId',
    element: <LocationDetail type="video" />,
  },
  {
    path: 'y/:id',
    element: <YoutubeRedirect />,
  },
])

root.render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
)
