import { FC, useState } from 'react'
import { Terms, Props } from 'typings/db'
import {
  textInputStyle,
  listContainerStyle,
  listTermsStyle,
  relatedTermsStyle,
  buttonInRelatedTermsStyle,
} from './styles'

const RelatedTerms: FC<Props> = (props) => {
  const [relatedTerms, setRelatedTerms] = useState([])
  const [inputTerm, setInputTerm] = useState('')

  const trimmedInputTerm = inputTerm.trim().replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, '')

  const onChangeTermInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastIdx = e.target.value.length - 1
    if (e.target.value[lastIdx] === ',' || e.target.value[lastIdx] === ' ')
      return
    setInputTerm(e.target.value)
  }

  const onClick = () => {
    const check = relatedTerms.some((term: string) => {
      return term === trimmedInputTerm
    })
    if (check) {
      setInputTerm('')
      alert('중복')
      console.log(relatedTerms)
      return
    }
    const termsArray = relatedTerms.concat(trimmedInputTerm)
    setRelatedTerms(termsArray)
    props.setRelatedTerms(termsArray)
    setInputTerm('')
  }
  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32) &&
      trimmedInputTerm
    )
      onClick()
  }
  const onRemove = (idx: number): void => {
    const termsArray = relatedTerms.filter(
      (term: string) => relatedTerms.indexOf(term) !== idx,
    )
    setRelatedTerms(termsArray)
    props.setRelatedTerms(termsArray)
  }

  return (
    <>
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
          {relatedTerms.map((relatedTerm: Terms, idx) => (
            <li css={relatedTermsStyle} key={idx}>
              {relatedTerm}
              <button
                css={buttonInRelatedTermsStyle}
                onClick={() => onRemove(idx)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default RelatedTerms
