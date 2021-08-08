import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import '../styles/global.css'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
