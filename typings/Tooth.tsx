export enum ToothGrowthStage {
  'primary_unteethed' = 0,
  'primary_teethed' = 1,
  'permanent_unteethed' = 2,
  'permanent_teethed' = 3,
  'permanent_lost' = 4,
}

export type Tooth = {
  name: string
  growthStage: ToothGrowthStage
}

export type PrimaryToothStage =
  | ToothGrowthStage.primary_unteethed
  | ToothGrowthStage.primary_teethed
  | ToothGrowthStage.permanent_unteethed
  | ToothGrowthStage.permanent_teethed
  | ToothGrowthStage.permanent_lost

export type PermanentToothStage =
  | ToothGrowthStage.permanent_unteethed
  | ToothGrowthStage.permanent_teethed
  | ToothGrowthStage.permanent_lost

export enum ToothGrowthAction {
  'teeth' = 'teeth',
  'shed' = 'shed',
  'abnormal' = 'abnormal',
  'remark' = 'remark',
}

export const extraActions = [
  ToothGrowthAction.abnormal,
  ToothGrowthAction.remark,
]
