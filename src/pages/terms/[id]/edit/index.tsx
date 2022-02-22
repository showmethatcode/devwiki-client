import React, { useState, Fragment } from 'react'
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
  inputTitleInEditModeStyle,
} from 'components/Terms/New/styles'

const termScreenStyle = css`
  width: 718px;
  margin: 0 auto;
`

const TermScreen = () => {
  const router = useRouter()
  const data = router.query

  const termId = data.id
  const initialName: string | string[] = data.name
  const initialDescription: string | string[] = data.description
  const initialTermsRelated = (data.termsRelated as unknown) as Terms[]

  const token = getDataFromLocalStorage('token')

  const [relatedTerms, setRelatedTerms] = useState<Terms[]>([])

  const [markdownContent, setMarkdownContent] = useState([])
  const isMarkdownContentEmpty = markdownContent.length === 0

  const onClickSubmit = () => {
    axios
      .post(
        `${server}/terms/`,
        {
          name: initialName,
          description: markdownContent,
          termsRelated: relatedTerms,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        alert('수정되었습니다')
        router.push(`${client}/terms/${termId}`)
      })
      .catch((err) => console.error(err))
  }

  return (
    <Fragment>
      <div id="container" css={termScreenStyle}>
        <h2>추가할 용어</h2>
        <input
          readOnly
          css={inputTitleInEditModeStyle}
          value={initialName}
          type="text"
          id="title_input"
        />
        <Markdown
          initialValue={initialDescription}
          setMarkdownContent={setMarkdownContent}
          isMarkdownContentEmpty={isMarkdownContentEmpty}
        />
        <RelatedTerms
          setRelatedTerms={setRelatedTerms}
          relatedTerms={initialTermsRelated}
        />
        <button
          css={
            !isMarkdownContentEmpty
              ? submitButtonStyle
              : submitButtonNotReadyStyle
          }
          disabled={!isMarkdownContentEmpty ? false : true}
          id="submit"
          onClick={onClickSubmit}
        >
          <span>저장하기</span>
        </button>
      </div>
    </Fragment>
  )
}

export default TermScreen
