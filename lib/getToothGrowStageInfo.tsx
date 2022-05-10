import {
  ToothRemarkActionTypes,
  Tooth,
  ToothGrowthActionType,
  ToothGrowthStage,
} from '../typings/Tooth'

export const getToothGrowStageDescription = ({ growthStage, name }: Tooth) => {
  const [jaw, leftOrRight, num] = name.split('')

  const mapping = {
    [ToothGrowthStage.primary_unteethed]: '未萌出',
    [ToothGrowthStage.primary_teethed]: '乳牙',
    [ToothGrowthStage.permanent_unteethed]: '乳牙脱落',
    [ToothGrowthStage.permanent_teethed]: '恒牙',
    [ToothGrowthStage.permanent_lost]: '恒牙脱落',
  }
  const mapping1 = {
    [ToothGrowthStage.permanent_unteethed]: '未萌出',
    [ToothGrowthStage.permanent_teethed]: '恒牙',
    [ToothGrowthStage.permanent_lost]: '恒牙脱落',
  }
  return num > 4 ? mapping1[growthStage] : mapping[growthStage]
}

export const getAvailableAction = ({ growthStage, name }: Tooth) => {
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
    actions.push(ToothGrowthActionType.ADVANCE)
  }

  if (canRevert) {
    actions.push(ToothGrowthActionType.REVERT)
  }
  return actions.concat(ToothRemarkActionTypes)
}

export const checkIsPresent = (toothGrowthStage: ToothGrowthStage) => {
  return toothGrowthStage % 2 === 1
}
