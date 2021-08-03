import { FC } from 'react'
import Header from 'components/Header'

const Layout: FC = ({ children }) => {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
