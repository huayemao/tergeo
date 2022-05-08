import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'
import Layout from '../../components/Layout'
import { Timer } from '../../components/Models/Timer'
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
  const { isActive } = useTimer()

  const toggleActive = useCallback(() => {
    timerDispatch({ type: 'TOGGLE_START' })
  }, [timerDispatch])
  const btnText = isActive ? '停止' : '开始'

  return (
    <>
      <Timer duration={120} />
      <button
        onClick={toggleActive}
        className="mr-2 mb-2 w-64 rounded-3xl border bg-indigo-400 px-5 py-2 text-center  font-medium text-white hover:bg-indigo-600  hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300  dark:focus:ring-blue-800"
      >
        {btnText}
      </button>
    </>
  )
}

function Index() {
  // const

  return (
    <ModelProvider>
      <TimerProvider>
        <Layout>
          <div
            className="relative bg-indigo-200/60  backdrop-blur-lg backdrop-filter"
            style={{ height: '36vh' }}
          >
            <CleaningModel />
            <Content></Content>
          </div>
        </Layout>
      </TimerProvider>
    </ModelProvider>
  )
}

export default Index
