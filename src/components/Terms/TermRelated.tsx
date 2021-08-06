import React, { useState, useCallback } from 'react'
import Markdown from './Markdown'
import '@toast-ui/editor/dist/toastui-editor.css'

import {
  relatedTermsStyle,
  buttonInRelatedTermsStyle,
  inputTitleStyle,
  textInputStyle,
  listContainerStyle,
  listTermsStyle,
  submitButtonStyle,
  submitButtonNotReadyStyle,
} from './styles'

const TermRelated = () => {
  interface ITerms {
    id: number
    text: string
  }
  const [relatedTerms, setRelatedTerms] = useState<ITerms[]>([])
  const [inputTerm, setInputTerm] = useState('')
  const [id, setId] = useState(1)

  const [makeTermsProcess, setMakeTermsProcess] = useState(false)
  const [contentNotFoundError, setContentNotFoundError] = useState(true)
  const [relatedTermsNotFoundError, setRelatedTermsNotFoundError] = useState(
    true,
  )
  const [titleInput, setTitleInput] = useState('')
  const [titleInputNotFoundError, setTitleInputNotFoundError] = useState(true)

  const onChangeInputTitle = useCallback(
    (e) => {
      setTitleInput(e.target.value)
      e.target.value.length > 0
        ? setTitleInputNotFoundError(false)
        : setTitleInputNotFoundError(true)
    },
    [titleInput],
  )

  const onChangeTermInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastIdx = e.target.value.length - 1
    if (e.target.value[lastIdx] === ',' || e.target.value[lastIdx] === ' ')
      return
    setInputTerm(e.target.value)
  }
  const onClick = () => {
    for (let i = 0; i < relatedTerms.length; i++) {
      if (relatedTerms[i].text === trimmedInputTerm) {
        setInputTerm('')
        alert('중복')
        return
      }
    }
    const termsArray = relatedTerms.concat({
      id: id,
      text: inputTerm.trim().replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, ''),
    })
    setRelatedTerms(termsArray)
    if (termsArray.length > 0) {
      setRelatedTermsNotFoundError(false)
    }
    setId(id + 1)
    setInputTerm('')
  }

  const trimmedInputTerm = inputTerm.trim().replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, '')

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32) &&
      trimmedInputTerm
    ) {
      onClick()
    }
  }

  const onRemove = (id: number): void => {
    const termsArray = relatedTerms.filter(
      (relatedTerms: ITerms) => relatedTerms.id !== id,
    )
    setRelatedTerms(termsArray)
    if (termsArray.length < 1) {
      setRelatedTermsNotFoundError(true)
    }
  }
  const relatedTermsList = relatedTerms.map((relatedTerms: ITerms) => (
    <li css={relatedTermsStyle} key={relatedTerms.id}>
      {relatedTerms.text}
      <button
        css={buttonInRelatedTermsStyle}
        onClick={() => onRemove(relatedTerms.id)}
      >
        X
      </button>
    </li>
  ))

  const onSubmit = useCallback((e: any) => {
    e.preventDefault()

    // if (!contentNotFoundError &&) {
    //   setMakeTermsProcess(true)
    // }
  }, [])
  return (
    <>
      <div id="container">
        <h2>추가할 용어</h2>
        <input
          css={inputTitleStyle}
          value={titleInput}
          onChange={onChangeInputTitle}
          type="text"
          id="title_input"
        />
        <Markdown onChange={(value: string) => console.log(value)} />
        <h2>관련 용어</h2>
        <input
          id="text_input"
          css={textInputStyle}
          placeholder="관련 있는 용어를 입력해주세요"
          value={inputTerm}
          onChange={onChangeTermInput}
          onKeyUp={onKeyUp}
        />
        <div css={listContainerStyle} id="container2">
          <ul css={listTermsStyle} id="list_terms">
            {relatedTermsList}
          </ul>
        </div>
        {!relatedTermsNotFoundError && !contentNotFoundError ? (
          <input
            css={submitButtonStyle}
            id="submit"
            type="submit"
            onSubmit={onSubmit}
            value="저장하기"
          />
        ) : (
          <input
            css={submitButtonNotReadyStyle}
            disabled={true}
            id="submit"
            type="submit"
            onSubmit={onSubmit}
            value="저장하기"
          />
        )}
      </div>
    </>
  )
}

export default TermRelated
