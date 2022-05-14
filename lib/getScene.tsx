import { Group, Scene, Vector3 } from 'three'
import { checkIsPresent } from './getToothGrowStageInfo'
import { INDIGO, TEAL } from '../constants/colors'
import { TeethScene } from '../components/Scenes/Main'
import { Mode } from '../typings/user'
import { isOnlyPermanent } from './teeth'

export function getScene4Home(
  mode,
  modelContext: any,
  teethContext: any
): Scene {
  const { model } = modelContext
  if (!model) return null

  const clonedScene = model.scene.clone()
  clonedScene.traverse((e) => {
    if (e.type === 'Mesh') {
      e.material = getMaterials4tooth(e, modelContext, teethContext)
    }
  })
  return clonedScene

  function getMaterials4tooth(tooth) {
    const { standardMaterial, activeToothName } = modelContext
    const { teeth } = teethContext

    const presentTeeth = teeth
      .filter((v) => checkIsPresent(v.growthStage))
      .map((e) => e.name)

    const [isUnGrown, isActive, onlyPermanent] = [
      !presentTeeth.includes(tooth.name),
      tooth.name === activeToothName,
      isOnlyPermanent(tooth.name),
    ]

    if ([isUnGrown, isActive].every((e) => !e)) {
      return standardMaterial
    }

    let material: MeshStandardMaterial = standardMaterial.clone()

    if (isUnGrown && mode === Mode.children) {
      material.opacity = 0.35
      material.transparent = true
    }

    if (mode === Mode.primary && onlyPermanent) {
      material.opacity = 0
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

const getHighlightedMat = (standardMaterial) => {
  let material: MeshStandardMaterial = standardMaterial.clone()
  material.color = INDIGO
  return material
}

export function getScene4HabitTimer(
  highlightedPrefix: string,
  modelContext: any,
  teethContext: any
): Scene {
  const { model, standardMaterial } = modelContext
  const clonedScene = model && model.scene.clone()
  clonedScene?.traverse((e) => {
    if (e.type === 'Mesh') {
      e.material = standardMaterial
      if (e.name.startsWith(highlightedPrefix)) {
        e.material = getHighlightedMat(standardMaterial)
      }
    }
    if (e.name === 'lower') {
      ;(e as Group).rotation.set(
        -0.25,
        -0.03490658382473835,
        -2.3180744649745875e-10
      )
      ;(e as Group).position.add(new Vector3(0, -8, 0))
    }
    if (e.name === 'upper') {
      ;(e as Group).rotation.set(0.2, 0, 0)
      ;(e as Group).position.add(new Vector3(0, 8, 0))
    }
  })
  return clonedScene
}
