import type { AppProps } from 'next/app'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}

export default MyApp
