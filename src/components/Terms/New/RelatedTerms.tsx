import { FC, useState } from 'react'
import {
  textInputStyle,
  listContainerStyle,
  listTermsStyle,
  relatedTermsStyle,
  buttonInRelatedTermsStyle,
} from './styles'

interface Term {
  id: number
  text: string
}

interface Props {
  relatedTerms: Term[]
  setRelatedTerms?: (content: Term[]) => void
  isRelatedTermsEmpty?: boolean
}

const RelatedTerms: FC<Props> = (props) => {
  const [relatedTerms, setRelatedTerms] = useState([])
  const [inputTerm, setInputTerm] = useState('')
  const [id, setId] = useState(1)

  const trimmedInputTerm = inputTerm.trim().replace(/[^ㄱ-힣a-zA-Z0-9+#]/gi, '')

  const onChangeTermInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastIdx = e.target.value.length - 1
    if (e.target.value[lastIdx] === ',' || e.target.value[lastIdx] === ' ')
      return
    setInputTerm(e.target.value)
  }

  const onClick = () => {
    const check = relatedTerms.some((term) => {
      return term.text === trimmedInputTerm
    })
    if (check) {
      setInputTerm('')
      alert('중복')
      console.log(relatedTerms)
      return
    }
    const termsArray = relatedTerms.concat({
      id: id,
      text: trimmedInputTerm,
    })
    setRelatedTerms(termsArray)
    props.setRelatedTerms(termsArray)
    setId(id + 1)
    setInputTerm('')
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      (e.keyCode === 188 || e.keyCode === 13 || e.keyCode === 32) &&
      trimmedInputTerm
    )
      onClick()
  }
  const onRemove = (id: number): void => {
    const termsArray = relatedTerms.filter(
      (relatedTerm: Term) => relatedTerm.id !== id,
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
          {relatedTerms.map((relatedTerm: Term) => (
            <li css={relatedTermsStyle} key={relatedTerm.id}>
              {relatedTerm.text}
              <button
                css={buttonInRelatedTermsStyle}
                onClick={() => onRemove(relatedTerm.id)}
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
