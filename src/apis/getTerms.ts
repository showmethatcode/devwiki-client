import axios from 'axios'
import { server } from 'constants/common'

export const getTerms = (id?: number) => {
  if (id !== undefined) {
    return axios.get(`${server}/terms/${id}`)
  } else {
    return axios.get(`${server}/terms`)
  }
}
