import { ArrowNarrowLeftIcon, CheckIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMessage } from '../contexts/messageContext'
import { BottomTab } from './BottomTab'
import { Toast } from './common/Toast'

export default function Layout({ children, title = '编贝', className }) {
  const { message, duration } = useMessage()
  const router = useRouter()
  const levels = router.pathname.split('/')
  const levelCount = levels.length

  const backLink = useMemo(
    () => (
      <button
        className="align-middle"
        onClick={() => {
          router.replace({ pathname: levels.slice(0, -1).join('/') })
        }}
      >
        <ArrowNarrowLeftIcon className="h-6 w-6" />
      </button>
    ),
    [levels, router]
  )

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={'flex min-h-screen flex-col ' + className}>
        <header className="sticky top-0 z-20 bg-white py-2 text-center align-middle text-xl font-bold leading-10 text-indigo-400 shadow">
          {levelCount > 2 && backLink} {title}
        </header>

        {message && (
          <div className="relative w-full text-center">
            <Toast
              duration={duration}
              autoClose
              className="absolute top-0 z-10 !max-w-full"
            >
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <CheckIcon className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">{message}</div>
              <Toast.Toggle />
            </Toast>
          </div>
        )}

        <main className="flex flex-1 flex-col">{children}</main>
        <BottomTab />
      </div>
    </>
  )
}
