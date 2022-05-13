import React from 'react'
import ActionMenu from '../../components/ActionMenu'
import { useModel } from '../../contexts/modelContext'
import { useTooth } from '../../contexts/teethContext'
import { getToothBaseInfo } from '../../lib/tooth'
import { getToothGrowStageDescription } from '../../lib/getToothGrowStageInfo'
import { Badge } from '../../components/common/Badge'
import ToothPreview from '../../components/Scenes/ToothPreview'
import Layout from '../../components/Layout'
import { GrowtTimeLine } from '../../components/GrowtTimeLine'

export default function ToothDetail() {
  const { activeToothName } = useModel()
  const { toothName, toothType, toothLocation } =
    (activeToothName && getToothBaseInfo(activeToothName)) || {}
  const tooth = useTooth(activeToothName)

  const { color, label } = (tooth && getToothGrowStageDescription(tooth)) || {}

  return (
    <Layout title={toothName}>
      <div className="flex-1 space-y-2 p-2">
        <ToothPreview />
        {tooth ? <Content tooth={tooth}></Content> : null}
      </div>
    </Layout>
  )
}

function Content({ tooth }) {
  return (
    <>
      <div className="my-auto flex flex-wrap items-center justify-start space-x-1">
        {/* <div className="rounded-3xl border border-gray-300 px-2 py-1 text-sm text-gray-400">
            {toothType}
          </div> */}
        {/* <Badge color={color} size="sm">
          {label}
        </Badge> */}
      </div>
      <GrowtTimeLine tooth={tooth} />
    </>
  )
}
