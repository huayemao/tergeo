const dev = process.env.NODE_ENV !== 'production'

export const ORIGIN = dev
  ? 'http://localhost:3000/'
  : '/'
