import IntroductionBox from 'components/IntroductionBox'
import TermList from 'components/TermList'
import { css } from '@emotion/react'

export type Term = { id: number; title: string }

const termListWrapperStyle = css`
  display: flex;
  justify-content: flex-start;
`

const latestTermsWrapperStyle = css`
  margin: 0 25% 0 0;
`

const rootStyle = css`
  width: 952px;
  margin: 0 auto;
`

const MainScreen = () => {
  const latestTerms: Term[] = [
    { id: 1, title: 'MySQL' },
    { id: 2, title: '피보나치 수열' },
    { id: 3, title: '개발자' },
    { id: 4, title: 'OOP' },
    { id: 5, title: '함수형 프로그래밍' },
    { id: 6, title: 'React' },
    { id: 7, title: 'TypeScript' },
    { id: 8, title: 'JavaScript' },
    { id: 9, title: 'Django' },
  ]
  const popularTerms: Term[] = [
    { id: 1, title: 'MySQL' },
    { id: 2, title: '피보나치 수열' },
    { id: 3, title: '개발자' },
    { id: 4, title: 'OOP' },
    { id: 5, title: '함수형 프로그래밍' },
    { id: 6, title: 'React' },
    { id: 7, title: 'TypeScript' },
    { id: 8, title: 'JavaScript' },
    { id: 9, title: 'Django' },
  ]
  return (
    <>
      <div css={rootStyle}>
        <IntroductionBox />
        <div css={termListWrapperStyle}>
          <TermList
            css={latestTermsWrapperStyle}
            terms={latestTerms}
            heading="🌿 최근에 추가된 용어"
          />
          <TermList
            terms={popularTerms}
            heading="👀 사람들이 가장 많이 본 용어 "
          />
        </div>
      </div>
    </>
  )
}

export default MainScreen
