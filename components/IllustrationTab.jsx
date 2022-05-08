import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IllustrationTab() {
  let [categories] = useState({
    牙齿介绍: Intro,
    牙齿记录: GrowtTimeLine,
    小贴士: Intro,
  })

  return (
    <div className="">
      <div className="w-full max-w-md sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100/40 p-1">
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
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((Comp, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2'
                )}
              >
                <Comp />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

const GrowtTimeLine = () => (
  <>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-6 text-left">
        <span class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200 ring-8 ring-white dark:bg-indigo-900 dark:ring-gray-900">
          <svg
            class="h-3 w-3 text-indigo-600 dark:text-indigo-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        <h3 class="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          萌出乳牙{' '}
          <span class="mr-2 ml-3 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-200 dark:text-indigo-800">
            最新
          </span>
        </h3>
        <time class="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          2022 年 1 月 13 日
        </time>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          花野猫6个月零8天，下颌中切牙萌出乳牙啦。
        </p>
      </li>

      {/* <li class="mb-10 ml-6">
      <span class="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200 ring-8 ring-white dark:bg-indigo-900 dark:ring-gray-900">
        <svg
          class="h-3 w-3 text-indigo-600 dark:text-indigo-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        Flowbite Figma v1.3.0
      </h3>
      <time class="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        Released on December 7th, 2021
      </time>
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">
        All of the pages and components are first designed in Figma and we keep
        a parity between the two versions even as we update the project.
      </p>
    </li> */}
    </ol>
    <a
      href="#"
      class="inline-flex items-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
    >
      <EyeIcon className="mr-2 h-4 w-4" />
      更多
    </a>
  </>
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
      title: "别忘了给孩子刷牙哦",
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
