import { Term } from 'screen/MainScreen'
import { css } from '@emotion/react'
import Link from 'next/link'
import colors from 'styles/colors'

const listItemStyle = css`
  margin: 10px;
  color: ${colors.blue};
  a {
    color: ${colors.blue};
  }
`

interface TermListProps {
  terms: Term[]
  heading: string
}

const TermList = (props: TermListProps) => {
  const { terms, heading } = props
  return (
    <div {...props}>
      <h2>{heading}</h2>
      <ul>
        {terms.map((term, idx) => (
          <li key={idx} css={listItemStyle}>
            <Link href={`/terms/${term.id}`}>{term.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TermList
