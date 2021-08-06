import React, { FC } from 'react'
import TermRelated from 'components/Terms/TermRelated'
import { css } from '@emotion/react'
import InputTitle from 'components/Terms/InputTitle'
// import { ControlledUsage } from 'components/Terms/ControlledUsage'

const termScreenStyle = css`
  padding: 0 21%;
`

const TermScreen: FC = () => {
  return (
    <div css={termScreenStyle}>
      {/* <InputTitle /> */}
      {/* <ControlledUsage /> */}
      <TermRelated />
    </div>
  )
}

export default TermScreen
