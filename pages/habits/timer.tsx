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
import { partial } from 'lodash'
import { getScene4HabitTimer } from '../../lib/getScene'

import 'react-h5-audio-player/lib/styles.css'
import { Player } from '../../components/Player'
import { getActiveZone } from '../../lib/getActiveZone'
import { playlist } from '../../constants/playlist'
import { toHHMMSS } from '../../lib/day'

const Scene = dynamic(() => import('../../components/TeethScene'), {
  ssr: false,
})

const getTimeDistance = (a, b) => (new Date(a) - new Date(b)) / 1000

const Content = () => {
  const timerDispatch = useTimerDispatch()
  const { isActive, message, seconds, historyRecords } = useTimer()

  // 从患者视角是反的，需要确定视角
  // 完成后是否还需要继续
  // 刷牙统计按钮
  // 切换洁牙方式

  const [highlightedPrefix, title] = useMemo(() => {
    return getActiveZone(seconds)
  }, [seconds])

  const toggleActive = useCallback(() => {
    timerDispatch({ type: 'TOGGLE_START' })
  }, [timerDispatch])
  const btnText = isActive ? '停止' : '开始'

  const getScene = useMemo(
    () => partial(getScene4HabitTimer, highlightedPrefix),
    [highlightedPrefix]
  )

  const timeMapping = {
    prepare: 0,
    tr: 1,
    br: 2,
    bl: 3,
    tl: 4,
    over: 5,
  }
  const index = timeMapping[highlightedPrefix]

  return (
    <>
      <div
        className="relative bg-indigo-200/60 backdrop-blur-lg backdrop-filter"
        style={{ height: '34vh' }}
      >
        <Scene diableSelect getScene={getScene} />
      </div>
      <div className="relative  flex-1  bg-white  text-gray-500">
        <div className="absolute -top-[60px] left-0 right-0 bottom-16 flex flex-col items-center  justify-around">
          <Timer duration={120} />
          <div className="h-24">
            <p
              suppressHydrationWarning
              className="mx-8 border-l-2 border-indigo-300 pl-2"
            >
              {playlist[index].text}
            </p>
          </div>
          <div className="h-8" suppressHydrationWarning>
            {(!isActive &&
              historyRecords.length &&
              `上次刷牙时长：` +
                toHHMMSS(
                  Math.abs(
                    getTimeDistance(
                      ...historyRecords[historyRecords.length - 1]
                    )
                  )
                )) ||
              null}
          </div>
          <section className="self-stretch text-center">
            <div
              suppressHydrationWarning
              className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8"
            >
              <Player />
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
            健康习惯计时器
            <span className="font-medium text-gray-500">
              {' '}
              ——
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
                />
              </Menu>
            </span>
          </>
        }
      >
        <Content />
      </Layout>
    </TimerProvider>
  )
}

export default CleaningTimer
