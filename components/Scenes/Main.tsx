// @ts-nocheck

import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useMemo, useCallback, Suspense, memo } from 'react'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { Tooth } from '../../typings/Tooth'
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
