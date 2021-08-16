import Header from 'components/Header'
import { css } from '@emotion/react'

const containerStyle = css`
  width: 1440px;
  margin: 0 auto;
`

const horizonStyle = css`
  border: none;
  height: 1px;
  background-color: #f4f4f4;
`

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <hr css={horizonStyle} />
      <main css={containerStyle}>{children}</main>
    </>
  )
}

export default Layout
