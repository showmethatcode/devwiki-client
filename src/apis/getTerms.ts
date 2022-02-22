import axios from 'axios'
import { server } from 'constants/common'

export const getTerms = (id: number) => {
  return axios.get(`${server}/terms/${id}`)
}
