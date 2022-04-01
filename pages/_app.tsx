import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ModelProvider from '../contexts/modelContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModelProvider {...pageProps}>
      <Component {...pageProps} />
    </ModelProvider>
  )
}

export default MyApp
