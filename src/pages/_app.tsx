import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import { css, Global } from '@emotion/react'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Global styles={globalStyle} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
