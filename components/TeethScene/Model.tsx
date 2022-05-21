import React, { useMemo, useCallback, useEffect } from 'react'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { Environment, OrbitControls } from '@react-three/drei'

export function Model({
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
      modelDispatch({
        type: 'RESET_FILTER_BY_TYPE',
      })
    diableSelect && handleResetActiveTooth()
  }, [diableSelect, modelDispatch, enableFilter, handleResetActiveTooth])

  const scene = useMemo(() => {
    return getScene(modelContext, teethContext)
  }, [getScene, modelContext, teethContext])

  return (
    <>
      <scene>
        <primitive
          object={scene || {}}
          onClick={handleSceneClick}
          onPointerMissed={handleResetActiveTooth}
        />
      </scene>
      <OrbitControls makeDefault />
      <Environment path="/" files="studio_small_03_1k.hdr" />
    </>
  )
}
