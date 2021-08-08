import EmojiContentBox from 'components/EmojiContentBox'
import TermList from 'components/TermList'
import { css } from '@emotion/react'
import { GITHUB_ORGANIZATION_URL } from 'constants/common'

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
        <EmojiContentBox emoji="dog">
          <p>
            개발용어사전은 누구나 용어를 추가하고 수정할 수 있는 대중 참여형
            사전이에요.
          </p>
          <p>
            심지어 개발에도 함께 참여할 수 있는{' '}
            <a href={GITHUB_ORGANIZATION_URL}>오픈소스 프로젝트</a>
            에요!
          </p>
        </EmojiContentBox>
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
