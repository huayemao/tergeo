import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/outline'
import { useSelectedTooth } from '../lib/hooks/useSelectedTooth'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
} from '../typings/Tooth'
import { GrowtTimeLine } from './GrowtTimeLine'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IllustrationTab() {
  const tooth = useSelectedTooth()

  let [categories] = useState({
    牙齿介绍: Intro,
    成长记录: GrowtTimeLine,
  })

  return (
    <div className="">
      <div className="w-full max-w-md sm:px-0">
        <Tab.Group>
          <Tab.List className="flex h-12 space-x-1 rounded-xl bg-indigo-100/40">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
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
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels
            className="mt-2 overflow-auto"
            style={{ height: 'calc(42vh - 3.5rem)' }}
          >
            {Object.values(categories).map((Comp, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames('rounded-xl bg-white p-3')}
              >
                <Comp tooth={tooth} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export const getTimeline = (tooth: Tooth) => {
  const filterdRecord: ToothGrowthRecord[] = tooth.growthRecord.reduce(
    (acc, cur) =>
      cur.type === ToothGrowthActionType.REVERT
        ? acc.slice(0, -1)
        : acc.concat(cur),
    []
  )
  return filterdRecord.reverse()
}

export const TimelineItem = ({ record }: { record: ToothGrowthRecord }) => {
  return (
    <li className="mb-10 ml-6 text-left">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200 ring-8 ring-white dark:bg-indigo-900 dark:ring-gray-900">
        <svg
          className="h-3 w-3 text-indigo-600 dark:text-indigo-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        {record.name}
        <span className="mr-2 ml-3 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800">
          最新
        </span>
      </h3>
      <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {new Date(record.dateTime).toLocaleString()}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        两个月{record.remarkContent}
      </p>
    </li>
  )
}

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
