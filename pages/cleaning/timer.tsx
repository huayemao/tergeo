import { ChevronDownIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import Menu from '../../components/common/Menu'
import Layout from '../../components/Layout'
import { Timer } from '../../components/Timer'
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
  }
)

const getTimeDistance = (a, b) => (new Date(a) - new Date(b)) / 1000

const Content = () => {
  const timerDispatch = useTimerDispatch()
  const { isActive, message, seconds, historyRecords } = useTimer()

  // 从患者视角是反的，需要确定视角
  // 完成后是否还需要继续
  // 刷牙统计按钮
  // 切换洁牙方式

  const [highlightedPrefix, title] = useMemo(() => {
    const timeMapping = {
      0: ['tr', '左上'],
      30: ['br', '左下'],
      60: ['bl', '右下'],
      90: ['tl', '右上'],
    }
    return getFromRange(timeMapping, seconds)
  }, [seconds])

  const toggleActive = useCallback(() => {
    timerDispatch({ type: 'TOGGLE_START' })
  }, [timerDispatch])
  const btnText = isActive ? '停止' : '开始'

  return (
    <>
      <div
        className="relative bg-indigo-200/60 backdrop-blur-lg backdrop-filter"
        style={{ height: '36vh' }}
      >
        <div className="absolute top-0 right-0 w-48 bg-white bg-opacity-70 p-2 text-sm backdrop-blur-lg backdrop-filter">
          <p className="leading-3 text-gray-500">
            已连续刷牙{' '}
            <span className="text-base font-semibold text-indigo-400 underline">
              12{' '}
            </span>
            天，上次刷牙 今天 7：40
          </p>
        </div>
        <CleaningModel highlightedPrefix={highlightedPrefix} />
      </div>
      <div className="relative  flex-1  bg-white  text-gray-500">
        <div className="absolute -top-[60px] bottom-16 flex flex-col items-center  justify-around">
          <Timer duration={120} />
          <p
            suppressHydrationWarning
            className="mx-8 border-l-2 border-indigo-300 pl-2"
          >
            {title}{' '}
            糖是人类的主要营养要素之一，是人体能量的主要来源，是许多食品及饮料的调味剂，同时也是公认的一种引起龋病发生的危险因素。
          </p>
          <section className="text-center">
            <div
              suppressHydrationWarning
              className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8"
            >
              todo:音乐功能 上次刷牙时间：
              {!isActive &&
                historyRecords.length &&
                Math.abs(
                  getTimeDistance(...historyRecords[historyRecords.length - 1])
                )}
            </div>
          </section>
          <button
            onClick={toggleActive}
            className="mr-2 mb-2 w-64 rounded-3xl border bg-indigo-400 px-5 py-2 text-center  font-medium text-white hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800"
          >
            {btnText}
          </button>
        </div>

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
    </>
  )
}

function CleaningTimer() {
  return (
    <TimerProvider>
      <Layout
        title={
          <>
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
          </>
        }
      >
        <Content />
      </Layout>
    </TimerProvider>
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
