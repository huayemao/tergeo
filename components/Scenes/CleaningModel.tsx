// @ts-nocheck

import { useThree } from '@react-three/fiber'
import {
  Html,
  Preload,
  OrbitControls,
  Select,
  Environment,
} from '@react-three/drei'

import React, { useRef, useMemo, useCallback, memo } from 'react'
import { Color, Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { getMaterials4tooth } from '../../lib/getMaterials4tooth'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { INDIGO } from '../../constants/colors'

const getHighlightedMat = (standardMaterial) => {
  let material: MeshStandardMaterial = standardMaterial.clone()
  material.color = INDIGO
  return material
}

function Model({ dispatch, modelContext, highlightedPrefix, teethContext }) {
  useFetchModel(dispatch, modelContext)
  const { model, standardMaterial } = modelContext

  const setactiveToothName = useCallback(
    (toothName) => {
      dispatch({
        type: 'SET_ACTIVE_TOOTH',
        payload: { toothName },
      })
    },
    [dispatch]
  )

  const { lower, upper } = model?.nodes || {}

  const scene = useMemo(() => {
    const clonedScene = model?.scene.clone()

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
  }, [highlightedPrefix, model?.scene, standardMaterial])

  return <primitive object={scene || {}} />
}

function Scene({ ...props }) {
  const canvasProps = {
    style: { height: '36vh' },
  }
  return (
    <SceneWrapper {...props} canvasProps={canvasProps} modelComponent={Model}>
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </SceneWrapper>
  )
}

export default memo(Scene)