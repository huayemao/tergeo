import { Tab } from '@headlessui/react'
import { EyeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import classNames from 'clsx'

export function IllustrationTab({ categories, tooth, metaInfo }) {
  return (
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
          className="mt-2 overflow-auto pb-12"
          style={{ height: 'calc(44vh - 5rem)' }}
        >
          {categories.map(({ component: Comp, key, label }) => (
            <Tab.Panel
              key={key}
              className={classNames('rounded-xl bg-white p-3')}
            >
              <Comp tooth={tooth} metaInfo={metaInfo} />
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
  )
}
