import React from 'react'
import OperationMenu from './ActionMenu'
import { useModel } from '../contexts/modelContext'
import { useTooth } from '../contexts/teethContext'
import { getToothBaseInfo } from '../lib/getToothBaseInfo'
import {
  getFinishedStages,
  getToothGrowStageDescription,
} from '../lib/getToothGrowStageInfo'
import { Badge } from './common/Badge'
import { EyeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useUser } from '../contexts/userContext'
import { Mode } from '../typings/user'

export default function Info() {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const tooth = useTooth(activeToothName)
  const { mode } = useUser()

  const stages = tooth ? getFinishedStages(tooth) : []

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

          {stages.map(({ label, color }) => (
            <Badge key={label} color={color} size="sm">
              {label}
            </Badge>
          ))}
        </div>
      ) : null}

      {mode === Mode.children && (
        <div className="flex items-center justify-center space-x-4  ">
          <OperationMenu />
        </div>
      )}
    </div>
  )
}
