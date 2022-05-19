import { useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useSelectedTooth } from '../lib/hooks/useSelectedTooth'
import { ToothGrowthActionType, ToothGrowthRecord } from '../typings/Tooth'
import { GrowtTimeLine } from './GrowtTimeLine'
import { useUser } from '../contexts/userContext'
import { compact } from 'lodash'
import Link from 'next/link'
import { Alert } from './common/Alert'
import { Mode } from '../typings/user'
import { Intro } from './Intro'
import FilterMenu from './FilterMenu'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IllustrationTab() {
  const tooth = useSelectedTooth()
  const user = useUser()

  const { mode } = user

  const isChildrenMode = mode === Mode.children
  const categories = useMemo(
    () =>
      compact([
        {
          key: 'intro',
          label: tooth ? '牙齿介绍' : '编贝',
          component: Intro,
        },
        mode === Mode.children &&
          tooth && {
            key: 'record',
            label: '成长记录',
            component: GrowtTimeLine,
          },
      ]),
    [mode, tooth]
  )

  return !tooth ? (
    <Tip user={user} />
  ) : (
    <div className="">
      <div className="relative w-full max-w-md sm:px-0">
        <Tab.Group>
          <Tab.List className="flex h-12 space-x-1 rounded-xl bg-indigo-100/40">
            {categories.map((category) => (
              <Tab
                key={category.key}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-semibold leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
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
          <Tab.Panels
            className="mt-2 overflow-auto"
            style={{ height: 'calc(42vh - 3.5rem)' }}
          >
            {categories.map(({ component: Comp, key, label }) => (
              <Tab.Panel
                key={key}
                className={classNames('rounded-xl bg-white p-3')}
              >
                <Comp tooth={tooth} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <Link href={'detail'} shallow>
          <a className="absolute bottom-20 right-4 inline-flex items-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <EyeIcon className="mr-2 h-4 w-4" />
            详情
          </a>
        </Link>
      </div>
    </div>
  )
}

function Extra({ user }) {
  return (
    <div className="w-48 bg-white bg-opacity-70 p-2 text-sm backdrop-blur-lg backdrop-filter">
      <p className="text-gray-500">
        {user.name}
        <span className="font-semibold text-indigo-400 ">六个月零8天</span>
        啦，已经坚韧地长出了{' '}
        <span className="font-semibold text-indigo-400">1 颗</span>牙
      </p>
    </div>
  )
}

const Tip = ({ user }) =>
  user.mode === Mode.children ? (
    <Extra user={user} />
  ) : (
    <div className="space-y-2">
      <div className="p-4 text-left">
        <p>
          选中模型中的一颗牙齿可以了解它的信息。
          <br />
        </p>
      </div>

      <Alert Icon={InformationCircleIcon} color="blue">
        <div className="text-left">
          如果您是正在长牙或换牙的孩子的家长，
          <Link href={'/me/account'}>
            <a className="underline">完善您孩子的信息</a>
          </Link>
          之后，可以切换为【牙齿成长模式】
          <br />
        </div>
      </Alert>
    </div>
  )
