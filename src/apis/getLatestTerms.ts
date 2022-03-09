import { server } from 'constants/common'
import axios from 'axios'

export const getLatestTerms = () => {
  return axios.get(`${server}/terms/latest`)
}
