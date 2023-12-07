import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import 'reset-css'

import './style.css'
import Home from './pages/home'
import Photo from './pages/p'
import Video from './pages/v'
import YoutubeRedirect from './pages/y'
import AppContextProvider from './providers/AppContextProvider'
import LocationDetail from './pages/location'

const container = document.getElementById('app')
const root = createRoot(container!)

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>error</div>,
  },
  {
    path: '/p',
    element: <Photo />,
  },
  {
    path: '/p/:locationId?/:itemId?',
    element: <LocationDetail type="photo" />,
  },
  {
    path: '/v',
    element: <Video />,
  },
  {
    path: '/v/:locationId?/:itemId?',
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
