import { FC, ReactNode } from 'react'
import 'reset-css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import StyledComponentsRegistry from '../lib/registry'

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
