export const GITHUB_ORGANIZATION_URL = 'https://github.com/showmethatcode'

const dev = process.env.NODE_ENV !== 'production'

export const client = dev
  ? 'http://localhost:3000'
  : 'http://devwiki-client.vercel.app'

export const server = dev
  ? 'http://localhost:8000'
  : `${process.env.NEXT_PUBLIC_API_URL}`
