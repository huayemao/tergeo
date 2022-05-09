import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TeethProvider from '../contexts/teethContext'
import ModelProvider from '../contexts/modelContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TeethProvider>
      <ModelProvider>
        <Component {...pageProps} />
      </ModelProvider>
    </TeethProvider>
  )
}

export default MyApp
