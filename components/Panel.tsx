import { useMemo, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useSelectedTooth } from '../lib/hooks/useSelectedTooth'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
} from '../typings/Tooth'
import { GrowtTimeLine } from './GrowtTimeLine'
import { useUser } from '../contexts/userContext'
import { compact } from 'lodash'
import Link from 'next/link'
import { Alert } from './common/Alert'
import { Mode } from '../typings/user'
import { Intro } from './Intro'
import FilterMenu from './FilterMenu'
import { BriefStats } from './BriefStats'
import { IllustrationTab } from './IllustrationTab'

export default function Panel({ metaInfo }) {
  const tooth = useSelectedTooth()
  const user = useUser()

  const { mode } = user

  const isChildrenMode = mode === Mode.children
  const categories = useMemo(
    () =>
      compact([
        {
          key: 'intro',
          label: tooth ? '牙齿介绍' : '编贝',
          component: Intro,
        },
        isChildrenMode &&
          tooth && {
            key: 'record',
            label: '成长记录',
            component: GrowtTimeLine,
          },
      ]),
    [isChildrenMode, tooth]
  )

  return !tooth ? (
    <Tip user={user} />
  ) : (
    <IllustrationTab {...{ categories, tooth, metaInfo }} />
  )
}

const Tip = ({ user }) =>
  user.mode === Mode.children ? (
    <BriefStats user={user} />
  ) : (
    <div className="space-y-2">
      <div className="p-4 text-left">
        <p>
          选中模型中的一颗牙齿可以了解它的信息。
          <br />
        </p>
      </div>

      <Alert Icon={InformationCircleIcon} color="blue">
        <div className="text-left">
          如果您是正在长牙或换牙的孩子的家长，
          <Link href={'/settings/account'}>
            <a className="underline">完善您孩子的信息</a>
          </Link>
          之后，可以切换为【牙齿成长模式】
          <br />
        </div>
      </Alert>
    </div>
  )
