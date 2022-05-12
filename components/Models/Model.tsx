// @ts-nocheck

import { useThree } from '@react-three/fiber'
import {
  Html,
  Preload,
  OrbitControls,
  Select,
  Environment,
} from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, useMemo, useCallback, Suspense } from 'react'
import { Color, Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { getMaterials4tooth } from '../../lib/getMaterials4tooth'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { useUser } from '../../contexts/userContext'
import { Mode } from '../../typings/user'

export const indigo = new Color(99 / 256, 102 / 256, 241 / 256)
export const teal = new Color(13 / 256, 148 / 256, 136 / 256)

function Model({ dispatch, modelContext, teeth }) {
  const { model, activeToothName = 'tl8', standardMaterial } = modelContext
  useFetchModel(dispatch, modelContext)

  const teethCount = teeth?.filter((e) => e.growthStage > 0).length

  const handleSceneClick = useCallback(
    (e) => {
      dispatch({
        type: 'SET_ACTIVE_TOOTH',
        payload: { toothName: e.object.name },
      })
    },
    [dispatch]
  )

  const handleResetActiveTooth = () => {
    dispatch({
      type: 'RESET_ACTIVE_TOOTH',
    })
  }

  const scene = useMemo(() => {
    const clonedScene = model && model.scene.clone()
    clonedScene?.traverse((e) => {
      if (e.type === 'Mesh') {
        e.material = getMaterials4tooth(
          standardMaterial,
          e,
          teeth,
          activeToothName
        )
      }
    })
    return clonedScene
  }, [activeToothName, model, standardMaterial, teeth])

  return (
    <scene>
      <primitive
        object={scene || {}}
        onClick={handleSceneClick}
        onPointerMissed={handleResetActiveTooth}
      />
    </scene>
  )
}

function Scene({ ...props }) {
  const canvasProps = {
    shadows: true,
    dpr: [1, 2],
    style: { height: '36vh' },
    camera: { position: [0, 8, 72], fov: 70, near: 10 },
  }
  return (
    <SceneWrapper canvasProps={canvasProps} {...props} modelComponent={Model}>
      <OrbitControls makeDefault enableDamping />
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </SceneWrapper>
  )
}

export default Scene
