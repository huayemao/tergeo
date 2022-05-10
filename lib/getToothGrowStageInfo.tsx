import {
  extraActions,
  Tooth,
  ToothGrowthAction,
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

export const getAvailableAction = (toothGrowthStage: ToothGrowthStage) => {
  return toothGrowthStage === ToothGrowthStage.permanent_lost
    ? extraActions
    : [
        toothGrowthStage % 2 === 0
          ? ToothGrowthAction.teeth
          : ToothGrowthAction.shed,
      ].concat(extraActions)
}

export const checkIsPresent = (tooth: Tooth) => {
  return tooth.growthStage % 2 === 1
}
