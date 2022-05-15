export enum ToothGrowthStage {
  'primary_unteethed' = 0,
  'primary_teethed' = 1,
  'permanent_unteethed' = 2,
  'permanent_teethed' = 3,
  'permanent_lost' = 4,
}

export type ToothGrowthRecord = {
  type: ToothGrowthActionType
  name: string
  dateTime: string
  remarkContent?: string
}

export type Tooth = {
  name: string
  growthStage: ToothGrowthStage
  growthRecord: ToothGrowthRecord[]
}

export type PrimaryToothStage =
  | ToothGrowthStage.primary_unteethed
  | ToothGrowthStage.primary_teethed
  | ToothGrowthStage.permanent_unteethed
  | ToothGrowthStage.permanent_teethed
  | ToothGrowthStage.permanent_lost

export type PermanentToothStage = Exclude<
  ToothGrowthStage,
  ToothGrowthStage.primary_unteethed | ToothGrowthActionType.primary_teethed
>

export enum ToothGrowthActionType {
  'ADVANCE' = 'ADVANCE',
  'REVERT' = 'REVERT',
  'TOGGLE_ABNORMAL' = 'TOGGLE_ABNORMAL', // 标注异常
  'REMARK' = 'REMARK', // 例如标注有萌发迹象、标注牙齿松动，还可以带有备注
}

export type ToothRemarkActionType = Exclude<
  ToothGrowthActionType,
  ToothGrowthActionType.ADVANCE | ToothGrowthActionType.REVERT
>

export const ToothRemarkActionTypes = [
  ToothGrowthActionType.TOGGLE_ABNORMAL,
  ToothGrowthActionType.REMARK,
]

export const ToothGrowthActionNameMapping = {
  [ToothGrowthActionType.TOGGLE_ABNORMAL]: '标注异常',
  [ToothGrowthActionType.REMARK]: '标注',
}

export enum PermanentToothType {
  'incisors' = 'incisors',
  'canines' = 'canines',
  'premolars' = 'premolars',
  'molars' = 'molars',
}

export const toothTypeMapping = {
  [PermanentToothType.premolars]: '前磨牙',
  [PermanentToothType.molars]: '磨牙',
  [PermanentToothType.incisors]: '切牙',
  [PermanentToothType.canines]: '尖牙',
}
