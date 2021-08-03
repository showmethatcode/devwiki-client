import React, { FC } from 'react'

type Term = {
  id: number
  title: string
}

const MainScreen: FC = () => {
  const latestTerms: Term[] = []
  const popularTerms: Term[] = []
  return (
    <>
      <div>MainScreen</div>
    </>
  )
}

export default MainScreen
