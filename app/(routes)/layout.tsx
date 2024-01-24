'use client'

import { FC, ReactNode } from 'react'
import 'reset-css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import StyledComponentsRegistry from '@/lib/registry'
import AppContextProvider from '@/providers/app-context'
import Cover from '@/components/cover'
import Footer from '@/components/footer'

// FIXME: font; global style

// FIXME: clean package.json

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <AppContextProvider>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <Cover />
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </div>
          </AppContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
