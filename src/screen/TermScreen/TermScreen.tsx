import React, { FC } from 'react'
import TermRelated from 'components/Terms/New/TermRelated'
import { css } from '@emotion/react'
// import InputTitle from 'components/terms/InputTitle'

const termScreenStyle = css`
  width: 718px;
  margin: 0 auto;
`

const TermScreen: FC = () => {
  return (
    <>
      <div css={termScreenStyle}>
        {/* <InputTitle /> */}
        <TermRelated />
      </div>
    </>
  )
}

export default TermScreen
