import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ModelProvider from '../contexts/modelContext'
import TeethProvider from '../contexts/teethContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TeethProvider>
      <ModelProvider {...pageProps}>
        <Component {...pageProps} />
      </ModelProvider>
    </TeethProvider>
  )
}

export default MyApp
