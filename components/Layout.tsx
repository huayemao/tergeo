import { CheckIcon } from '@heroicons/react/solid'
import { useMessage } from '../contexts/messageContext'
import { BottomTab } from './BottomTab'
import { Toast } from './common/Toast'

export default function Layout({ children, title, className }) {
  const { message, duration } = useMessage()
  return (
    <>
      <div className={'flex min-h-screen flex-col ' + className}>
        <h1 className="sticky top-0 z-20 bg-white py-2 text-center align-middle text-xl font-bold leading-10 text-indigo-400 shadow">
          {title}
        </h1>
        {message && (
          <div className="w-full text-center relative">
            <Toast duration={duration} autoClose className="!max-w-full absolute top-0 z-10">
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
