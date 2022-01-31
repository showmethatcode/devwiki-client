const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:8000'
  : `${process.env.NEXT_PUBLIC_API_URL}`
