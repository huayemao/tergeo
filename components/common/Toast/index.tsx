import { PropsWithChildren, FC, useState } from 'react'
import classNames from 'clsx'
import { Duration, ToastContext } from './ToastContext'
import { ToastToggle } from './ToastToggle'

export type ToastProps = PropsWithChildren<{
  className?: string
  duration?: Duration
  autoClose?: boolean
}>

const durationClasses: Record<Duration, string> = {
  75: 'duration-75',
  100: 'duration-100',
  150: 'duration-150',
  200: 'duration-200',
  300: 'duration-300',
  500: 'duration-500',
  700: 'duration-700',
  1000: 'duration-1000',
}

const ToastComponent: FC<ToastProps> = ({
  children,
  className,
  duration = 1200,
  autoClose,
}) => {
  const [isClosed, setIsClosed] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  if (autoClose) {
    setTimeout(() => setIsClosed(true), duration - 300)
    setTimeout(() => setIsRemoved(true), duration)
  }

  return (
    <ToastContext.Provider
      value={{ duration, isClosed, isRemoved, setIsClosed, setIsRemoved }}
    >
      <div
        data-testid="toast-element"
        className={classNames(
          'flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400',
          'duration-300',
          { 'opacity-0 ease-out': isClosed },
          { hidden: isRemoved },
          className
        )}
      >
        {children}
      </div>
    </ToastContext.Provider>
  )
}

ToastComponent.displayName = 'Toast'
ToastToggle.displayName = 'Toast.Toggle'

export const Toast = Object.assign(ToastComponent, {
  Toggle: ToastToggle,
})
