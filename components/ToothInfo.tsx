import React from 'react'
import OperationMenu from './ActionMenu'
import { useModel } from '../contexts/modelContext'
import { useTooth } from '../contexts/teethContext'
import { getToothBaseInfo } from '../lib/getToothBaseInfo'
import { getToothGrowStageDescription } from '../lib/getToothGrowStageInfo'
import { Badge } from './common/Badge'
import { EyeIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export function Info() {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const tooth = useTooth(activeToothName)

  const { color, label } = (tooth && getToothGrowStageDescription(tooth)) || {}

  return (
    <div className="flex-1 space-y-2 p-2">
      <h2
        suppressHydrationWarning
        className="mt-4 text-center text-xl font-semibold text-indigo-500 drop-shadow-sm"
      >
        {toothName || '请选择牙齿'}
      </h2>
      {tooth ? (
        <div className="my-auto flex flex-wrap items-center justify-start space-x-1">
          {/* <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
            {toothType}
          </div> */}
          <Badge color={color} size="sm">
            {label}
          </Badge>
        </div>
      ) : null}

      <div className="flex items-center justify-center space-x-4  ">
        <OperationMenu />
        <Link href={'toothDetail'} shallow>
          <a className="inline-flex items-center rounded-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
            <EyeIcon className="mr-2 h-4 w-4" />
            更多
          </a>
        </Link>
      </div>
    </div>
  )
}
