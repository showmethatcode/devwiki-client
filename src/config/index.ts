const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:8000'
  : 'https://your_deployment.server.com' // 배포된 API 서버
