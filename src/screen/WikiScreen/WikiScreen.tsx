import React from 'react'
import { css } from '@emotion/react'
import DetailTerm from 'components/Terms/Detail/DetailTerm'

const wikiScreenStyle = css`
  width: 951px;
  margin: 0 auto;
`

const WikiScreen = () => {
  return (
    <div css={wikiScreenStyle}>
      <DetailTerm />
    </div>
  )
}

export default WikiScreen
