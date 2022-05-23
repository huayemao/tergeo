import { ArrowNarrowLeftIcon, CheckIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { APP_NAME } from '../constants/origin'
import { useMessage } from '../contexts/messageContext'
import { BottomTab } from './BottomTab'
import { Toast } from './common/Toast'

export default function Layout({ children, title, className }) {
  const { message, duration } = useMessage()
  const router = useRouter()
  const seperatedPaths = router.pathname.split('/') // 路径名中按照下划线分隔得到的路径数组

  // 返回按钮组件
  const gobackButton = useMemo(() => {
    const targetPathName = seperatedPaths.slice(0, -1).join('/') //路径数组去掉最后一位后再拼接成字符串
    return (
      <div className="absolute left-4">
        <Link href={{ pathname: targetPathName }} replace shallow>
          <a className="align-middle">
            <ArrowNarrowLeftIcon className="inline h-6 w-6" />
          </a>
        </Link>
      </div>
    )
  }, [seperatedPaths])

  return (
    <>
      <Head>
        {/* html title 标签，用于在浏览器标签页展示标题，以及搜索引擎优化 */}
        <title>
          {APP_NAME} {(typeof title === 'string' && ' | ' + title) || ''}
        </title>
      </Head>
      <div className={'flex min-h-screen flex-col ' + className}>
        <header className="sticky top-0 z-20 flex h-12 max-h-[6vh] flex-shrink-0 items-center justify-center bg-white text-xl font-bold text-indigo-400 shadow">
          {seperatedPaths.length > 2 && gobackButton} {title}
        </header>

        {/* 全局消息提示组件 */}
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
