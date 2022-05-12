import { MeshStandardMaterial } from 'three'
import { INDIGO, TEAL } from '../constants/colors'
import { filter } from 'lodash'
import { checkIsPresent } from './getToothGrowStageInfo'
import { Mode } from '../typings/user'

export function getMaterials4tooth(
  tooth,
  modelContext,
  teethContext,
  mode = Mode.usual
) {
  const { standardMaterial, activeToothName } = modelContext
  const { teeth } = teethContext
  if (standardMaterial) {
    const GROWN_TEETH = filter(teeth, (v) => checkIsPresent(v.growthStage)).map(
      (e) => e.name
    )

    const [isUnGrown, isActive] = [
      !GROWN_TEETH.includes(tooth.name),
      tooth.name === activeToothName,
    ]

    if ([isUnGrown, isActive].every((e) => !e)) {
      return standardMaterial
    }

    let material: MeshStandardMaterial = standardMaterial.clone()

    if (isUnGrown && mode === Mode.children) {
      material.opacity = 0.35
      material.transparent = true
    }
    if (isActive) {
      material.color = INDIGO
      if (isUnGrown) {
        material.opacity = 0.6
        material.color = TEAL
      }
    }

    return material
  }
}
