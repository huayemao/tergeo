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
  diableSelect = false,
  enableFilter = false,
}: {
  diableSelect: boolean
  canvasProps: CanvasProps
  diableFilter: boolean
}) {
  return (
    <SceneWrapper
      {...{ canvasProps, getScene, diableSelect, enableFilter }}
      modelComponent={Model}
    >
      <OrbitControls makeDefault />
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </SceneWrapper>
  )
}

function Model({
  dispatch: modelDispatch,
  teethDispatch,
  modelContext,
  teethContext,
  getScene,
  diableSelect,
  enableFilter,
}) {
  useFetchModel(modelDispatch, modelContext)

  const handleSceneClick = useCallback(
    (e) => {
      !diableSelect &&
        modelDispatch({
          type: 'SET_ACTIVE_TOOTH',
          payload: { toothName: e.object.name },
        })
    },
    [diableSelect, modelDispatch]
  )

  const handleResetActiveTooth = useCallback(() => {
    modelDispatch({
      type: 'RESET_ACTIVE_TOOTH',
    })
  }, [modelDispatch])

  useEffect(() => {
    !enableFilter &&
      teethDispatch({
        type: 'RESET_FILTER_BY_TYPE',
      })
    diableSelect && handleResetActiveTooth()
  }, [
    diableSelect,
    modelDispatch,
    enableFilter,
    handleResetActiveTooth,
    teethDispatch,
  ])

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
