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
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  Suspense,
  memo,
} from 'react'
import { Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { useUser } from '../../contexts/userContext'
import { Mode } from '../../typings/user'
import { Tooth } from '../../typings/Tooth'
import { getScene4Home } from '../../lib/getScene'
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/'

export function TeethScene({
  canvasProps,
  getScene,
}: {
  canvasProps: CanvasProps
}) {
  return (
    <SceneWrapper
      canvasProps={canvasProps}
      getScene={getScene}
      modelComponent={Model}
    >
      <OrbitControls makeDefault enableDamping />
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </SceneWrapper>
  )
}

function Model({ dispatch, modelContext, teethContext, getScene }) {
  useFetchModel(dispatch, modelContext)

  const { model } = modelContext
  const { teeth } = teethContext

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
    return getScene(modelContext, teethContext)
  }, [getScene, modelContext, teethContext])

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

export default memo(TeethScene)
