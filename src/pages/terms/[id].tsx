import React from 'react'
import useSWR from 'swr'
import { css } from '@emotion/react'
import fetcher from 'utils/fetcher'

interface User {
  id: number
  name: string
  email: string
  username: string
}

const wikiScreenStyle = css`
  width: 951px;
  margin: 0 auto;
`

const DetailTerm = ({ post, id }) => {
  const { data, error } = useSWR<User[]>(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    fetcher,
    {
      data: post,
    },
  )

  if (!data || error) return <div>No Data!</div>

  return (
    <div css={wikiScreenStyle}>
      <ul key={data.id}>
        <h1>
          name: {data.name} (username: {data.username})
        </h1>
        <h2>email: {data.email}</h2>
      </ul>
    </div>
  )
}

export default DetailTerm

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/')
  const posts = await res.json()
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
  )
  const post = await res.json()

  return { props: { post, id: params.id } }
}
