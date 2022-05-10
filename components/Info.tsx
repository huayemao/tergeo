import React from 'react'
import OperationMenu from './OperationMenu'
import { useModel } from '../contexts/modelContext'
import { useTooth } from '../contexts/teethContext'
import { getToothBaseInfo } from '../lib/getToothBaseInfo'
import { getToothGrowStageDescription } from '../lib/getToothGrowStageInfo'

export function Info() {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const tooth = useTooth(activeToothName)

  return (
    <div className="flex-1 space-y-2 p-2">
      <h2
        suppressHydrationWarning
        className="mt-4 text-center text-xl font-medium text-indigo-700 drop-shadow-sm"
      >
        {toothName || '请选择牙齿'}
      </h2>
      {tooth ? (
        <div className="my-auto flex flex-wrap items-center justify-start space-x-1">
          {toothLocation.map((e) => (
            <div
              key={e}
              className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400"
            >
              {e}
            </div>
          ))}

          <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
            {toothType}
          </div>
          <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
            {!tooth ? '' : getToothGrowStageDescription(tooth)}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-center space-x-4  ">
        <OperationMenu />
      </div>
    </div>
  )
}
