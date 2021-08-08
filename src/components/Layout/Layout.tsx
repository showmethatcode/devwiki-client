import { FC } from 'react'
import Header from 'components/Header'
import { css } from '@emotion/react'

const containerStyle = css`
  margin: 0 20% 0 20%;
`

const Layout: FC = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Header />
      <main css={containerStyle}>{children}</main>
    </>
  )
}

export default Layout
