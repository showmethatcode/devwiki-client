import {
  wikiScreenStyle,
  inputTitleStyle,
  titleBlockStyle,
  editButtonStyle,
  listTermsStyle,
  relatedTermsStyle,
  descriptionStyle,
  revisionButtonStyle,
} from 'components/Terms/Detail/styles'
import { DetailTermProps, RelatedTerm } from 'typings/db'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getTerms } from 'apis/getTerms'
import DateParse from 'utils/DateParse'
import { GetStaticPropsContext } from 'next'
import axios from 'axios'
import { server, client } from 'constants/common'
import { useRouter } from 'next/router'

const DetailTerm = ({ id }: DetailTermProps) => {
  const router = useRouter()
  const { data, isLoading, isError, error } = useQuery(['terms', id], () =>
    getTerms(id),
  )
  const editTerms = () => {
    const termRelatedNames = data.data.term.termsRelated.map(
      (term: RelatedTerm) => term.name,
    )

    axios
      .put(`${server}/terms/${id}`, {
        description: data.data.term.description,
        termRelatedNames: termRelatedNames,
      })
      .then((res) => {
        router.push({
          pathname: `${client}/terms/${id}/edit`,
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }
  if (isError) return <div>Oops.. {error} occurred..</div>

  return (
    <div css={wikiScreenStyle}>
      <div css={titleBlockStyle}>
        <h1 css={inputTitleStyle}>{data.data.term.name}</h1>
        <button css={editButtonStyle} onClick={editTerms}>
          <span>📝 내용 개선하기</span>
        </button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data.data.term.description }}
      ></div>
      <ul css={listTermsStyle}>
        {data.data.term.termsRelated.map((relatedTerm: RelatedTerm) => (
          <li
            css={relatedTermsStyle}
            onClick={() => router.push(`${client}/terms/${relatedTerm.id}`)}
            key={relatedTerm.id}
          >
            {relatedTerm.name}
          </li>
        ))}
      </ul>
      <div>{DateParse(data.data.term.createdAt).date}</div>
      <button css={revisionButtonStyle}>
        <span>✨ 수정 기록 보기</span>
      </button>
      <div css={descriptionStyle}>
        개발용어사전은 누구나 수정하고 추가할 수 있는 공개형 사전이에요 😎
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    if (context?.params?.id) {
      const id = Number(context.params.id)
      const queryClient = new QueryClient()
      await queryClient.prefetchQuery('terms', () => getTerms(id))

      if (queryClient.getQueryCache().find('terms') == null) {
        return {
          notFound: true,
        }
      }
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

export default DetailTerm