import React, { useState, useCallback } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/dist/client/router'
import getDataFromLocalStorage from 'utils/getDataFromLocalStorage'
import RelatedTerms from 'components/Terms/New/RelatedTerms'
import Markdown from 'components/Terms/Markdown/MarkdownEditor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios'
import { server, client } from 'constants/common'
import { Terms } from 'typings/db'
import {
  submitButtonStyle,
  submitButtonNotReadyStyle,
  inputTitleStyle,
} from 'components/Terms/New/styles'

const termScreenStyle = css`
  width: 718px;
  margin: 0 auto;
`

const TermScreen = () => {
  const router = useRouter()
  const token = getDataFromLocalStorage('token')
  const [titleInput, setTitleInput] = useState('')
  const isTitleInputEmpty = titleInput.length === 0
  const onChangeInputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleInput(e.target.value)
    },
    [titleInput],
  )

  const [relatedTerms, setRelatedTerms] = useState<Terms[]>([])
  const isRelatedTermsEmpty = relatedTerms.length === 0

  const [markdownContent, setMarkdownContent] = useState([])
  const isMarkdownContentEmpty = markdownContent.length === 0

  const onClickSubmit = () => {
    axios
      .post(
        `${server}/terms/`,
        {
          name: titleInput,
          description: markdownContent,
          termRelatedNames: relatedTerms,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        alert('등록되었습니다')
        router.push(`${client}`)
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      <div id="container" css={termScreenStyle}>
        <h2>추가할 용어</h2>
        <input
          css={inputTitleStyle}
          value={titleInput}
          onChange={onChangeInputTitle}
          type="text"
          id="title_input"
        />
        <Markdown
          initialValue=""
          setMarkdownContent={setMarkdownContent}
          isMarkdownContentEmpty={isMarkdownContentEmpty}
        />
        <RelatedTerms
          setRelatedTerms={setRelatedTerms}
          relatedTerms={relatedTerms}
          isRelatedTermsEmpty={isRelatedTermsEmpty}
        />
        <button
          css={
            !isTitleInputEmpty ? submitButtonStyle : submitButtonNotReadyStyle
          }
          disabled={!isTitleInputEmpty ? false : true}
          id="submit"
          onClick={onClickSubmit}
        >
          <span>저장하기</span>
        </button>
      </div>
    </>
  )
}

export default TermScreen
