'use client'

import { FC, ReactNode } from 'react'
import Script from 'next/script'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
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

// FIXME: check github action (to be checked)

// FIXME: readme

const myFont = localFont({
  src: '../_assets/fonts/huninn.ttf',
})

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html className={myFont.className}>
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
        <Script
          strategy="lazyOnload"
          src="https://www.youtube.com/iframe_api"
        />
        <GoogleAnalytics gaId="G-2J7BK20P5Q" />
      </body>
    </html>
  )
}

export default RootLayout
