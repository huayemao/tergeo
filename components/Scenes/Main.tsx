// @ts-nocheck

import { OrbitControls, Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useMemo, useCallback, Suspense, memo, useEffect } from 'react'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { SceneWrapper } from './SceneWrapper'
import { Tooth } from '../../typings/Tooth'
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/'

export function TeethScene({
  canvasProps,
  getScene,
  canSelect = true,
}: {
  canSelet: boolean
  canvasProps: CanvasProps
}) {
  return (
    <SceneWrapper
      canvasProps={canvasProps}
      getScene={getScene}
      modelComponent={Model}
      canSelet={canSelect}
    >
      <OrbitControls makeDefault />
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </SceneWrapper>
  )
}

function Model({ dispatch, modelContext, teethContext, getScene, canSelet }) {
  useFetchModel(dispatch, modelContext)

  const handleSceneClick = useCallback(
    (e) => {
      canSelet &&
        dispatch({
          type: 'SET_ACTIVE_TOOTH',
          payload: { toothName: e.object.name },
        })
    },
    [canSelet, dispatch]
  )

  const handleResetActiveTooth = useCallback(() => {
    dispatch({
      type: 'RESET_ACTIVE_TOOTH',
    })
  }, [dispatch])

  useEffect(() => {
    !canSelet && handleResetActiveTooth()
  }, [canSelet, handleResetActiveTooth])

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
