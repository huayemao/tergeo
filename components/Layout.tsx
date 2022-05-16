import { ArrowNarrowLeftIcon, CheckIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { APP_NAME } from '../constants/origin'
import { useMessage } from '../contexts/messageContext'
import { BottomTab } from './BottomTab'
import { Toast } from './common/Toast'

export default function Layout({ children, title = '编贝', className }) {
  const { message, duration } = useMessage()
  const router = useRouter()
  const levels = router.pathname.split('/')

  const gobackButton = useMemo(
    () => (
      <div className="absolute left-4">
        <Link
          href={{ pathname: levels.slice(0, -1).join('/') }}
          replace
          shallow
        >
          <a className="align-middle">
            <ArrowNarrowLeftIcon className="inline h-6 w-6" />
          </a>
        </Link>
      </div>
    ),
    [levels]
  )

  return (
    <>
      <Head>
        <title>
          {APP_NAME} {(typeof title === 'string' && ' | ' + title) || ''}
        </title>
      </Head>
      <div className={'flex min-h-screen flex-col ' + className}>
        <header className="sticky top-0 z-20 bg-white py-2 text-center align-middle text-xl font-bold leading-10 text-indigo-400 shadow">
          {levels.length > 2 && gobackButton} {title}
        </header>

        {message && (
          <div className="relative w-full text-center">
            <Toast
              duration={duration}
              autoClose
              className="absolute top-0 z-10 !max-w-full"
            >
              <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
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
