import { MeshStandardMaterial } from 'three'
import { indigo, teal } from '../components/Models/Model'
import { filter } from 'lodash'

export function getMaterials4tooth(
  standardMaterial,
  tooth,
  teeth,
  activeToothName
) {
  if (standardMaterial) {
    const GROWN_TEETH = filter(teeth, (v) => v.grown === true).map(
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

    if (isUnGrown) {
      material.opacity = 0.35
      material.transparent = true
    }
    if (isActive) {
      material.color = indigo
      if (isUnGrown) {
        material.opacity = 0.6
        material.color = teal
      }
    }

    return material
  }
}
