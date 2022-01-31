import React from 'react'
import useSWR from 'swr'
import {
  wikiScreenStyle,
  inputTitleStyle,
  titleBlockStyle,
  editButtonStyle,
  listTermsStyle,
  relatedTermsStyle,
} from 'components/Terms/Detail/styles'
import fetcher from 'utils/fetcher'
import { server } from 'config'

interface Term {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  related: { id: number; text: string }[]
}

interface RelatedTerm {
  id: number
  text: string
}

const DetailTerm = ({ post, id }) => {
  const { data, error } = useSWR<Term>(`terms/${id}`, fetcher, { data: post })

  if (!data || error) return <div>No Data!</div>

  return (
    <div css={wikiScreenStyle}>
      <div css={titleBlockStyle}>
        <h1 css={inputTitleStyle}>{data.name}</h1>
        <button css={editButtonStyle}>
          <span>📝 내용 개선하기</span>
        </button>
      </div>
      <div>{data.description}</div>
      <ul css={listTermsStyle}>
        {data.related.map((relatedTerm: RelatedTerm) => (
          <li css={relatedTermsStyle} key={relatedTerm.id}>
            {relatedTerm.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailTerm

export async function getStaticPaths() {
  const res = await fetch(`${server}/terms`)
  const posts = await res.json()
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${server}/terms/${params.id}`)
  const post = await res.json()

  return { props: { post, id: params.id } }
}
