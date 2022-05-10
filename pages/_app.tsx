import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TeethProvider from '../contexts/teethContext'
import ModelProvider from '../contexts/modelContext'
import UserProvider from '../contexts/userContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider {...pageProps}>
      <TeethProvider {...pageProps}>
        <ModelProvider {...pageProps}>
          <Component {...pageProps} />
        </ModelProvider>
      </TeethProvider>
    </UserProvider>
  )
}

export default MyApp
