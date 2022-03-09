import React, { useState, Fragment } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/dist/client/router'
import getDataFromLocalStorage from 'utils/getDataFromLocalStorage'
import RelatedTerms from 'components/Terms/New/RelatedTerms'
import Markdown from 'components/Terms/Markdown/MarkdownEditor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios'
import { server, client } from 'constants/common'
import { Terms, DetailTermProps, RelatedTerm } from 'typings/db'
import {
  submitButtonStyle,
  submitButtonNotReadyStyle,
  inputTitleInEditModeStyle,
} from 'components/Terms/New/styles'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getTerms } from 'apis/getTerms'

const termScreenStyle = css`
  width: 718px;
  margin: 0 auto;
`

const EditScreen = ({ id }: DetailTermProps) => {
  const router = useRouter()
  const { data, isLoading } = useQuery(['terms', id], () =>
    getTerms(id),
  )

  const token = getDataFromLocalStorage('token')
  const [relatedTerms, setRelatedTerms] = useState<Terms[]>([])
  const [markdownContent, setMarkdownContent] = useState([])
  const isMarkdownContentEmpty = markdownContent.length === 0
  const onClickSubmit = () => {
    axios
      .put(
        `${server}/terms/${id}`,
        {
          description: markdownContent,
          termRelatedNames: relatedTerms,
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
        router.push(`${client}/terms/${id}`)
      })
      .catch((err) => {
        console.error(err)
        console.log('실패')
      })
  }

  if (isLoading || !data) {
    return <div>No Data!</div>
  }
  const termRelatedNames = data.data.term.termsRelated.map(
    (term: RelatedTerm) => term.name,
  )

  return (
    <Fragment>
      <div id="container" css={termScreenStyle}>
        <h2>추가할 용어</h2>
        <input
          readOnly
          css={inputTitleInEditModeStyle}
          value={data.data.term.name}
          type="text"
          id="title_input"
        />
        <Markdown
          initialValue={data.data.term.description || ''}
          setMarkdownContent={setMarkdownContent}
          isMarkdownContentEmpty={isMarkdownContentEmpty}
        />
        <RelatedTerms
          setRelatedTerms={setRelatedTerms}
          relatedTerms={termRelatedNames}
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    if (context?.params?.id) {
      const id = Number(context.params.id)
      const queryClient = new QueryClient()

      await queryClient.prefetchQuery('terms', () => getTerms(id), {
        staleTime: 1000,
      })

      return {
        props: {
          dehydratedState: dehydrate(queryClient).toString(),
          id: context.params.id,
        },
      }
    }
  } catch (error) {
    console.error('Error', error)
  }

  return {
    props: {
      id: context.params.id,
    },
  }
}

export default EditScreen
