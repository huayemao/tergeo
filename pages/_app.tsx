import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TeethProvider from '../contexts/teethContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TeethProvider>
      <Component {...pageProps} />
    </TeethProvider>
  )
}

export default MyApp
