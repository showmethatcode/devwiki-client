import React, { FC } from 'react'
import { css } from '@emotion/react'
import { GITHUB_ORGANIZATION_URL } from 'constants/common'

const rootStyle = css`
  background-color: #fafafa;
  margin: 40px 0 40px 0;
  padding: 10px 10px 10px 10px;
  display: flex;
  align-items: center;
`

const headerContentStyle = css`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 27px;
  margin: 0 17px 0 17px;
`

const articleStyle = css`
  p {
    margin: auto;
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
  }
`

const IntroductionBox: FC = () => {
  return (
    <>
      <section css={rootStyle}>
        <header>
          <p css={headerContentStyle}>🐶</p>
        </header>
        <article css={articleStyle}>
          <p>
            개발용어사전은 누구나 용어를 추가하고 수정할 수 있는 대중 참여형
            사전이에요.
          </p>
          <p>
            심지어 개발에도 함께 참여할 수 있는{' '}
            <a href={GITHUB_ORGANIZATION_URL}>오픈소스 프로젝트</a>
            에요!
          </p>
        </article>
      </section>
    </>
  )
}

export default IntroductionBox
