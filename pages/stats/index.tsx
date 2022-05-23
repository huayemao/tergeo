// @ts-nocheck
import { Tab } from '@headlessui/react'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { Label } from '../../components/common/FormControls/Label'
import { TextInput } from '../../components/common/FormControls/TextInput'
import Layout from '../../components/Layout'
import { compact } from 'lodash'
import { useUser } from '../../contexts/userContext'
import classNames from 'clsx'
import { BriefStats } from '../../components/BriefStats'
import { useTimer } from '../../contexts/timerContext'

const Stats: NextPage = ({ data }) => {
  const user = useUser()
  const { child } = user
  const categories = useMemo(
    () =>
      compact([
        {
          key: 'habits',
          label: '健康习惯',
          component: X,
        },
        child && {
          key: 'record',
          label: '成长记录',
          component: Grow,
        },
      ]),
    [child]
  )

  return (
    <Layout title={'统计'}>
      <BaseTab categories={categories} tabPanelProps={{ user }}></BaseTab>
    </Layout>
  )
}

export default Stats

const Grow = (props) => {
  return (
    <>
      <BriefStats {...props} />
      <div>全部成长记录</div>
    </>
  )
}

const X = () => {
  const { historyRecords } = useTimer()
  return (
    <section className="text-center">
      <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 rounded-xl border-2 border-indigo-600 lg:grid-cols-4">
          <li className="p-4">
            <p className="text-2xl font-extrabold text-indigo-500">12</p>
            <p suppressHydrationWarning className="mt-1 text-lg font-medium">
              天连续刷牙
            </p>
          </li>
          <li className="p-4">
            <p className="text-2xl font-extrabold text-indigo-500">2</p>
            <p className="mt-1 text-lg font-medium">次打卡剩余</p>
          </li>
        </ul>
      </div>
      {JSON.stringify(historyRecords)}
    </section>
  )
}
function BaseTab({ categories, tabPanelProps }) {
  return (
    <Tab.Group>
      <Tab.List className="flex h-12 w-full space-x-1 rounded-xl bg-indigo-100/40">
        {categories.map((category) => (
          <Tab
            key={category.key}
            className={({ selected }) =>
              classNames(
                'rounded-lg px-5 py-2.5 text-sm font-semibold leading-5',
                'm-1 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-500 shadow'
                  : 'text-indigo-400 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {category.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {categories.map(({ component: Comp, key, label }) => (
          <Tab.Panel
            key={key}
            className={classNames('rounded-xl bg-white p-3')}
          >
            <Comp {...tabPanelProps} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
