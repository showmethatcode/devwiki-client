import axios from 'axios'

const fetcher = (url: string) => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      withCredentials: true,
    })
    .then((response) => response.data)
}

export default fetcher
