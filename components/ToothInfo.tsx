import React, { memo } from 'react'
import ActionMenu from './ActionMenu'
import { useModel } from '../contexts/modelContext'
import { useTooth } from '../contexts/teethContext'
import { getToothBaseInfo, getToothTypeInfo } from '../lib/tooth'
import {
  getFinishedStages,
  getToothGrowStageDescription,
} from '../lib/getToothGrowStageInfo'
import { Badge } from './common/Badge'
import { EyeIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useUser } from '../contexts/userContext'
import { Mode } from '../typings/user'

function Info() {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const tooth = useTooth(activeToothName)
  const { mode } = useUser()

  const stages = tooth ? getFinishedStages(tooth) : []
  const isChildrenMode = mode === Mode.children

  return (
    <div className="flex-1 space-y-2 p-2">
      <h2
        suppressHydrationWarning
        className="mt-4 text-center text-xl font-semibold text-indigo-500 drop-shadow-sm"
      >
        {toothName || '请选择牙齿'}
      </h2>
      {isChildrenMode && tooth ? (
        <div className="my-auto flex flex-wrap items-center   space-x-1">
          {stages.map(({ label, color }) => (
            <Badge className='m-0.5' key={label} color={color} size="sm">
              {label}
            </Badge>
          ))}
        </div>
      ) : null}
      <div className="flex items-center justify-center space-x-4  ">
        {isChildrenMode && <ActionMenu />}
      </div>
    </div>
  )
}

export default memo(Info)
