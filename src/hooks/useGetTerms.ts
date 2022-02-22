import { useQuery } from 'react-query'
import { getTerms } from 'apis/getTerms'
import { Term } from 'typings/db'

export const useGetTerms = (id: number, props) =>
  useQuery<Term>('terms', () => getTerms(id), {
    initialData: props.dehydratedState,
  })
