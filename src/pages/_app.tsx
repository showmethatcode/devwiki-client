import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { css, Global } from '@emotion/react'

const globalStyle = css`
  html,
  body {
    padding: 0;
    font-family: Pretendard;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #3d73ff;
  }
`

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <>
      <Global styles={globalStyle} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
