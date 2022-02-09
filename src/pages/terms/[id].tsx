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
import { DetailTermProps } from 'typings/db'
import {
  GetServerSideProps,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPathsContext,
  GetStaticPaths,
} from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import { getTerms } from 'apis/getTerms'
import DateParse from 'utils/DateParse'

const DetailTerm = ({ id }: DetailTermProps) => {
  const { data, isLoading, isError, error } = useQuery('terms', () =>
    getTerms(id),
  )

  if (isLoading || !data) {
    return <div>Loading...</div>
  }
  if (isError) return <div>Oops.. {error} occurred..</div>

  return (
    <div css={wikiScreenStyle}>
      <div css={titleBlockStyle}>
        <h1 css={inputTitleStyle}>{data.data.term.name}</h1>
        <button css={editButtonStyle}>
          <span>📝 내용 개선하기</span>
        </button>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: data.data.term.description }}
      ></div>
      <ul css={listTermsStyle}>
        <li css={relatedTermsStyle}>Frontend</li>
        <li css={relatedTermsStyle}>JavaScript</li>
      </ul>
      {/* <ul css={listTermsStyle}>
        {data.data.term.termRelatedNames.map((relatedTerm: RelatedTerm) => (
          <li css={relatedTermsStyle} key={relatedTerm.id}>
            {relatedTerm.name}
          </li>
        ))}
      </ul> */}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    if (context?.params?.number) {
      const id = Number(context.params.id)
      const queryClient = new QueryClient()
      await queryClient.prefetchQuery('terms', () => getTerms(id), {
        staleTime: 1000,
      })
      if (!JSON.parse(JSON.stringify(dehydrate(queryClient)))) {
        return {
          notFound: true,
        }
      }
      return {
        props: {
          dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
          id: context.params.number,
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

// localhost:8000/terms/1
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     if (context?.params?.id) {
//       const id = Number(context.params.id)
//       const queryClient = new QueryClient()

//       await queryClient.prefetchQuery('terms', () => getTerms(id), {
//         staleTime: 1000,
//       })

//       return {
//         props: {
//           dehydratedState: dehydrate(queryClient).toString() || undefined,
//           id: context.params.id || undefined,
//         },
//       }
//     }
//   } catch (error) {
//     console.error('Error', error)
//   }

//   return {
//     props: {
//       id: context.params.id,
//     },
//   }
// }

export default DetailTerm
