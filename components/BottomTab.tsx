import React from 'react'
import {
  HomeIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ClockIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { map } from 'lodash'

export function BottomTab() {
  const router = useRouter()

  const mapping = {
    tips: [AcademicCapIcon],
    '': [HomeIcon],
    me: [UserCircleIcon],
    cleaning: [ClockIcon],
  }

  return (
    <div suppressHydrationWarning className="fixed bottom-4 flex  w-screen ">
      <div
        suppressHydrationWarning
        className="mx-12 flex h-12 flex-1 items-center justify-around rounded-3xl  bg-white px-10 text-gray-400 shadow-2xl "
      >
        {map(mapping, (v: Icon, k) => {
          const Icon = mapping[k][0]
          const pathname = `/${k}`
          const isActive = router.pathname === pathname
          return (
            <Link key={k} shallow href={pathname}>
              <Icon
                className={
                  'h-8 w-8 font-light' + (isActive ? ' text-indigo-500' : '')
                }
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
