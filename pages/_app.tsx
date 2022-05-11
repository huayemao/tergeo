import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TeethProvider from '../contexts/teethContext'
import ModelProvider from '../contexts/modelContext'
import UserProvider from '../contexts/userContext'
import MessageProvider from '../contexts/messageContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MessageProvider {...pageProps}>
      <UserProvider {...pageProps}>
        <TeethProvider {...pageProps}>
          <ModelProvider {...pageProps}>
            <Component {...pageProps} />
          </ModelProvider>
        </TeethProvider>
      </UserProvider>
    </MessageProvider>
  )
}

export default MyApp
