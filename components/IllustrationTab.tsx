import { useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useSelectedTooth } from '../lib/hooks/useSelectedTooth'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
} from '../typings/Tooth'
import { GrowtTimeLine } from './GrowtTimeLine'
import { useUser } from '../contexts/userContext'
import { compact } from 'lodash'
import Link from 'next/link'
import { Alert } from './common/Alert'
import { Mode } from '../typings/user'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IllustrationTab() {
  const tooth = useSelectedTooth()

  const { mode } = useUser()

  const categories = useMemo(
    () =>
      compact([
        {
          key: 'intro',
          label: tooth ? '牙齿介绍' : '编贝',
          component: Intro,
        },
        mode !== 'usual' && {
          key: 'record',
          label: '成长记录',
          component: GrowtTimeLine,
        },
      ]),
    [mode, tooth]
  )

  return (
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
            {tooth ? (
              categories.map(({ component: Comp, key, label }) => (
                <Tab.Panel
                  key={key}
                  className={classNames('rounded-xl bg-white p-3')}
                >
                  <Comp tooth={tooth} />
                </Tab.Panel>
              ))
            ) : (
              <Tip></Tip>
            )}
          </Tab.Panels>
        </Tab.Group>
        <Link href={'toothDetail'} shallow>
          <a className="absolute bottom-20 right-4 inline-flex items-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <EyeIcon className="mr-2 h-4 w-4" />
            详情
          </a>
        </Link>
      </div>
    </div>
  )
}

const Tip = () => (
  <div className="space-y-2">
    <Alert color="indigo">
      <div className="text-left">
        您正在以【普通模式】访问，选中每一颗牙齿可以模型观察和了解每颗牙齿的形态。
        <br />
      </div>
    </Alert>
    <Alert Icon={InformationCircleIcon} color="blue">
      <div className="text-left">
        如果您是一名正在长牙或换牙的孩子的家长，
        <Link href={'/me/account'}>
          <a className="underline">完善您孩子的信息</a>
        </Link>
        之后，可以切换为【牙齿成长模式】
        <br />
      </div>
    </Alert>
  </div>
)

const Intro = () => {
  const posts = [
    {
      id: 1,
      title: '一岁零两个月',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: '别忘了给孩子刷牙哦',
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ]
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          className="hover:bg-coolGray-100 relative rounded-md p-3"
        >
          <h3 className="text-sm font-medium leading-5">{post.title}</h3>

          <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
            <li>{post.date}</li>
            <li>&middot;</li>
            <li>{post.commentCount} comments</li>
            <li>&middot;</li>
            <li>{post.shareCount} shares</li>
          </ul>

          <a
            href="#"
            className={classNames(
              'absolute inset-0 rounded-md',
              'ring-indigo-400 focus:z-10 focus:outline-none focus:ring-2'
            )}
          />
        </li>
      ))}
    </ul>
  )
}
