import React, { useState, useCallback } from 'react'
import useSWR from 'swr'
import Markdown from '../Markdown/MarkdownEditor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios'
import fetcher from 'utils/fetcher'
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
  // const { data } = useSWR('RESTAPI', fetcher)
  interface ITerms {
    id: number
    text: string
  }
  const [relatedTerms, setRelatedTerms] = useState<ITerms[]>([])
  const [inputTerm, setInputTerm] = useState('')
  const [id, setId] = useState(1)

  const [isContentEmpty, setIsContentEmpty] = useState(true)
  const [makeTermsError, setMakeTermsError] = useState('')
  const [markdownContent, setMarkdownContent] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [isTitleInputEmpty, setIsTitleInputEmpty] = useState(true)

  const onChangeInputTitle = useCallback(
    (e) => {
      setTitleInput(e.target.value)
      e.target.value.length > 0
        ? setIsTitleInputEmpty(false)
        : setIsTitleInputEmpty(true)
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
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    console.log('굿굿굿')
  }, [])
  // const onSubmit = useCallback(
  //   (e: any, props) => {
  //     if (!isContentEmpty && !isTitleInputEmpty) {
  //       setMakeTermsError('')
  //       axios
  //         .post('http://localhost:3095/api/terms/new', {
  //           titleInput,
  //           markdownContent,
  //           relatedTerms,
  //         })
  //         .then((response) => {
  //           // 성공
  //           console.log(response)
  //         })
  //         .catch((error) => {
  //           console.log(error.response)
  //           setMakeTermsError(error.response.data)
  //         })
  //     }
  //   },
  //   [titleInput, relatedTerms],
  // )

  // if (data) {
  //   return {
  //     redirect: {
  //       destination: '/terms',
  //       permanent: false,
  //     },
  //   }
  // }
  console.log(markdownContent)

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
        <Markdown
          setIsContentEmpty={setIsContentEmpty}
          onChange={() => console.log()}
          setMarkdownContent={setMarkdownContent}
        />
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
        <form onSubmit={onSubmit}>
          <button
            css={
              !isTitleInputEmpty && !isContentEmpty
                ? submitButtonStyle
                : submitButtonNotReadyStyle
            }
            disabled={!isTitleInputEmpty && !isContentEmpty ? false : true}
            id="submit"
            type="submit"
          >
            <span>저장하기</span>
          </button>
        </form>
      </div>
    </>
  )
}

export default TermRelated
