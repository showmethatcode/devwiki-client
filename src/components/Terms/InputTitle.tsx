import { css } from '@emotion/react'
import React, { FC, useCallback, useState } from 'react'
import { Box } from '@material-ui/core'
import useInput from 'components/hooks/useInput'

const inputTitleStyle = css`
  font-family: Pretendard;
  font-style: normal;
  background-color: #fcfcfc;
  border: 1px solid #efefef;
  padding: 0 16px;
  font-size: 14px;
  width: 100%;
  height: 52px;
  margin-bottom: 28px;
`

const InputTitle: FC = () => {
  const [titleInput, setTitleInput] = useInput('')
  const [titleInputNotFoundError, setTitleInputNotFoundError] = useState(true)

  const onChangeInputTitle = useCallback(
    (e) => {
      setTitleInput(e.target.value)
      setTitleInputNotFoundError(false)
    },
    [titleInput],
  )

  return (
    <div>
      <Box>
        <h2>추가할 용어</h2>
        <input css={inputTitleStyle} type="text" id="title_input" />
      </Box>
    </div>
  )
}

export default InputTitle
