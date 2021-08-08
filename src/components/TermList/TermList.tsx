import React, { FC } from 'react'
import { Term } from 'screen/MainScreen'
import { css } from '@emotion/react'

const listItemStyle = css`
  margin: 10px;
  color: #3d73ff;
  a {
    color: #3d73ff;
  }
`

interface TermListProps {
  terms: Term[]
  heading: string
}

const TermList: FC<TermListProps> = (props) => {
  const { terms, heading } = props
  return (
    <div {...props}>
      <h2>{heading}</h2>
      {terms.map((term) => (
        <li css={listItemStyle}>
          <a href={`/terms/${term.id}`}>{term.title}</a>
        </li>
      ))}
    </div>
  )
}

export default TermList
