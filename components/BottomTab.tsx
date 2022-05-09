import React from 'react'
import {
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  ClockIcon,
  ChartSquareBarIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { map } from 'lodash'

export function BottomTab() {
  const router = useRouter()

  const mapping = {
    stats: [ChartSquareBarIcon],
    cleaning: [ClockIcon],
    '': [HomeIcon],
    tips: [AcademicCapIcon],
    me: [UserIcon],
  }

  return (
    <div
      suppressHydrationWarning
      className="fixed bottom-4 flex w-screen justify-center "
    >
      <div
        suppressHydrationWarning
        className="mx-12 flex h-12 flex-1 items-center justify-around rounded-3xl  bg-white px-10 text-gray-400 shadow-2xl "
      >
        {map(mapping, (v: Icon, k) => {
          const Icon = mapping[k][0]
          const pathname = `/${k}`
          const isActive = router.pathname.split('/')?.[1] === k

          return (
            <Link key={k} shallow replace href={pathname}>
              <Icon
                strokeWidth="1.5"
                className={
                  'mx-2 h-9 w-9' + (isActive ? ' text-indigo-500' : '')
                }
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
