const dev = process.env.NODE_ENV !== 'production'

export const ORIGIN = dev
  ? 'http://localhost:3000/'
  : 'http://47.114.89.18:3000/'
