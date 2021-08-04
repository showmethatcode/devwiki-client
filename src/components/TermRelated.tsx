import React, { useState } from 'react'
import 'easymde/dist/easymde.min.css'
// import { ControlledUsage } from './ControlledUsage'

const TermRelated = () => {
  interface ITerms {
    id: number
    text: string
  }
  const [relatedTerms, setRelatedTerms] = useState<ITerms[]>([])
  const [inputTerm, setInputTerm] = useState('')
  const [id, setId] = useState(1)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // console.log({ trimmedInputTerm, keyCode: e.keyCode });
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
    <li key={relatedTerms.id}>
      {relatedTerms.text}
      <button onClick={() => onRemove(relatedTerms.id)}>X</button>
    </li>
  ))

  const onSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <>
      <div id="container">
        <h2>추가할 용어</h2>
        <input type="text" id="title_input" />
        {/* <ControlledUsage /> */}

        <h2>관련 용어</h2>
        <input
          id="text_input"
          placeholder="관련 있는 용어를 입력해주세요"
          value={inputTerm}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
        <div id="container2">
          <ul id="list_terms">{relatedTermsList}</ul>
        </div>
        <input id="submit" type="submit" onSubmit={onSubmit} value="저장하기" />
      </div>
    </>
  )
}

export default TermRelated
