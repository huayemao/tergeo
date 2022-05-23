import { Tooth, ToothGrowthStage } from '../typings/Tooth'

export function getAllTeeth() {
  const locations = ['tr', 'tl', 'bl', 'br']
  const nums = Array.from({ length: 8 }, (e, i) => i + 1)
  const teethNames = locations.flatMap((e) => nums.map((el) => e + el))

  const teeth: Tooth[] = teethNames.map((e) => ({
    name: e,
    growthStage: isOnlyPermanent(e)
      ? ToothGrowthStage.permanent_unteethed
      : ToothGrowthStage.primary_unteethed,

    growthRecord: [],
  }))
  return teeth
}

export const isOnlyPermanent = (name: string) => name.split('')[2] > 5

// 恒牙已长出
export const isPresentPermanentTooth = (tooth: Tooth) => {
  return tooth.growthStage > ToothGrowthStage.permanent_unteethed
}

// 乳牙已萌出
export const isPresentPrimaryTooth = (tooth: Tooth) => {
  return (
    !isOnlyPermanent(tooth.name) &&
    tooth.growthStage > ToothGrowthStage.primary_unteethed
  )
}

// 乳牙已脱落
export const isShedPrimaryTooth = (tooth: Tooth) => {
  return (
    !isOnlyPermanent(tooth.name) &&
    tooth.growthStage > ToothGrowthStage.primary_teethed
  )
}
