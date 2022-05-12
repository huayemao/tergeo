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
import { Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { getMaterials4tooth } from '../../lib/getMaterials4tooth'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { useUser } from '../../contexts/userContext'
import { Mode } from '../../typings/user'

function Model({ dispatch, modelContext, teethContext, mode }) {
  const { model, activeToothName = 'tl8', standardMaterial } = modelContext
  useFetchModel(dispatch, modelContext)
  const { teeth } = teethContext
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
        e.material = getMaterials4tooth(e, modelContext, teethContext, mode)
      }
    })
    return clonedScene
  }, [mode, model, modelContext, teethContext])

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
