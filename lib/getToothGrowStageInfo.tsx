import { BadgeColor } from '../components/common/Badge'
import {
  ToothRemarkActionTypes,
  Tooth,
  ToothGrowthActionType,
  ToothGrowthStage,
} from '../typings/Tooth'

export type GrowStageDescription = {
  label: string
  color: BadgeColor
}

export const getToothGrowStageDescription: GrowStageDescription = ({
  growthStage,
  name,
}: Tooth) => {
  const [jaw, leftOrRight, num] = name.split('')

  const ordianrayMapping = {
    [ToothGrowthStage.primary_unteethed]: {
      label: '未萌出',
      color: 'blue',
    },
    [ToothGrowthStage.primary_teethed]: {
      label: '已萌出乳牙',
      color: 'green',
    },
    [ToothGrowthStage.permanent_unteethed]: {
      label: '乳牙脱落',
      color: 'pink',
    },
    [ToothGrowthStage.permanent_teethed]: {
      label: '已萌出恒牙',
      color: 'indigo',
    },
    [ToothGrowthStage.permanent_lost]: {
      label: '恒牙已脱落',
      color: 'gray',
    },
  }

  const permanentMapping = {
    ...ordianrayMapping,
    [ToothGrowthStage.permanent_unteethed]: {
      label: '未萌出',
      color: 'blue',
    },
  }

  return num > 4 ? permanentMapping[growthStage] : ordianrayMapping[growthStage]
}

const path = ['萌出乳牙', '乳牙脱落', '萌出恒牙', '恒牙脱落']

export const getToothGrowActionDescription = ({ growthStage, name }: Tooth) => {
  const [jaw, leftOrRight, num] = name.split('')
}

export const getAvailableToothAction = (tooth: Tooth) => {
  const { growthStage, name } = tooth

  //是否可以前进
  const canAdvance = !(growthStage === ToothGrowthStage.permanent_lost)

  // 是否可以撤销
  const canRevert = !(
    growthStage === ToothGrowthStage.primary_unteethed ||
    (name.split('')[2] > 4 &&
      growthStage === ToothGrowthStage.permanent_unteethed)
  )

  const actions = []

  if (canAdvance) {
    const actionName = checkIsPresent(tooth.growthStage) ? '脱落' : '萌出'
    actions.push({
      name: path[tooth.growthStage],
      confirmDescription: `已经${actionName}了吗`,
      type: ToothGrowthActionType.ADVANCE,
      showTime: true,
    })
  }

  if (canRevert) {
    const lastActionName = !checkIsPresent(tooth.growthStage) ? '脱落' : '萌出'
    const lastStage = getToothGrowStageDescription({
      ...tooth,
      growthStage: tooth.growthStage - 1,
    })
    actions.push({
      name: '撤销',
      confirmDescription: `要撤销${lastActionName}吗，它的上一个状态是${lastStage}`,
      type: ToothGrowthActionType.REVERT,
    })
  }
  return actions
}

export const checkIsPresent = (toothGrowthStage: ToothGrowthStage) => {
  return toothGrowthStage % 2 === 1
}

export type ToothGrowAction = {
  name: string
  confirmDescription: string
  type: ToothGrowthActionType
  showTime?: boolean
}
// 动作详情还需要时间输入框、文本输入框等！还有后续的状态变化，
// 所有的状态变化都可以有备注，备注可以折叠或打开，直接在 action 里加一个 Payload 好了

const allStages = toArray(ToothGrowthStage)

export const getFinishedStages = (tooth: Tooth): GrowStageDescription[] => {
  if (
    tooth.growthStage === ToothGrowthStage.primary_unteethed ||
    (tooth.growthStage === ToothGrowthStage.permanent_unteethed &&
      tooth.name.split('')[2] > 4)
  ) {
    return [getToothGrowStageDescription(tooth)]
  }
  const filteredStages = allStages.filter(
    (e, i) => i !== 0 && i <= allStages.indexOf(tooth.growthStage)
  )
  return filteredStages.map((e) =>
    getToothGrowStageDescription({ ...tooth, growthStage: e })
  )
}

function toArray(enumme) {
  return Object.values(enumme).filter((v) => Number.isInteger(v))
}
