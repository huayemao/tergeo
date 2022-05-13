import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TeethProvider from '../contexts/teethContext'
import ModelProvider from '../contexts/modelContext'
import UserProvider from '../contexts/userContext'
import MessageProvider from '../contexts/messageContext'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <MessageProvider>
      <UserProvider>
        <TeethProvider>
          <ModelProvider>
            {getLayout(<Component {...pageProps} />)}
          </ModelProvider>
        </TeethProvider>
      </UserProvider>
    </MessageProvider>
  )
}

export default MyApp
