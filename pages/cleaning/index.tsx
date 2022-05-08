import { ChevronDownIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import Menu from '../../components/common/Menu'
import Layout from '../../components/Layout'
import { Timer } from '../../components/Models/Timer'
import OperationModal from '../../components/OperationModal'
import ModelProvider from '../../contexts/modelContext'
import TimerProvider, {
  useTimerDispatch,
  useTimer,
} from '../../contexts/timerContext'

const CleaningModel = dynamic(
  () => import('../../components/Models/CleaningModel'),
  {
    ssr: false,
    loading: () => <p>...</p>,
  }
)

const Content = () => {
  const timerDispatch = useTimerDispatch()
  const { isActive, message, seconds } = useTimer()

  // 从患者视角是反的，需要确定视角
  // 完成后是否还需要继续
  // 刷牙统计按钮
  // 切换洁牙方式
  const timeMapping = {
    0: ['tr', '左上'],
    30: ['br', '左下'],
    60: ['bl', '右下'],
    90: ['tl', '右上'],
  }
  const [highlightedPrefix, title] = useMemo(
    () => getFromRange(timeMapping, seconds),
    [seconds]
  )

  const toggleActive = useCallback(() => {
    timerDispatch({ type: 'TOGGLE_START' })
  }, [timerDispatch])
  const btnText = isActive ? '停止' : '开始'

  return (
    <div>
      <h1 className="bg-white py-2 text-center align-middle text-xl font-semibold leading-10 text-indigo-400">
        花野猫
        <sub className="font-medium text-gray-500">
          &nbsp;的牙齿健康习惯挑战——
          <Menu
            options={[{ label: '牙线' }]}
            className={
              'inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
            }
          >
            刷牙
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />{' '}
          </Menu>
        </sub>
      </h1>

      <div
        className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
        style={{ height: '36vh' }}
      >
        <CleaningModel highlightedPrefix={highlightedPrefix} />
      </div>
      <div className="relative -top-10 mx-10 rounded-lg bg-white shadow-lg">
        {title}
      </div>
      <Timer duration={120} />
      <button
        onClick={toggleActive}
        className="mr-2 mb-2 w-64 rounded-3xl border bg-indigo-400 px-5 py-2 text-center  font-medium text-white hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800"
      >
        {btnText}
      </button>
      <Link href={'/'}>
        <a className="underline">已连续刷牙3天 上次刷牙3:12</a>
      </Link>
      {message && (
        <OperationModal
          content={message}
          isOpen
          onConfirm={() => {
            timerDispatch({ type: 'CONFIRM_END' })
          }}
          closeModal={() => {
            timerDispatch({ type: 'CANCEL_END' })
          }}
          title={message}
        />
      )}
    </div>
  )
}

function CleaningTimer() {
  return (
    <ModelProvider>
      <TimerProvider>
        <Layout>
          <Content />
        </Layout>
      </TimerProvider>
    </ModelProvider>
  )
}

export default CleaningTimer

const getFromRange = (timeMapping, current) => {
  const entries = Object.entries(timeMapping)
  for (let i = 0; i < entries.length; i++) {
    const [k, v] = entries[i]
    if (
      current >= parseInt(k, 10) &&
      (!entries[i + 1] || current < parseInt(entries[i + 1][0], 10))
    ) {
      return v
    }
  }
  return entries[0][1]
}
