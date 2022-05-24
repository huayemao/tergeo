import React, { useMemo, useCallback, useEffect } from 'react'
import { useFetchModel } from '../../lib/hooks/useFetchModel'
import { Environment, OrbitControls } from '@react-three/drei'

export function Model({
  dispatch,
  modelContext,
  teethContext,
  getScene,
  diableSelect,
  enableFilter,
}) {
  useFetchModel(dispatch, modelContext)

  const handleSceneClick = useCallback(
    (e) => {
      !diableSelect &&
        dispatch({
          type: 'SET_ACTIVE_TOOTH',
          payload: { toothName: e.object.name },
        })
    },
    [diableSelect, dispatch]
  )

  const handleResetActiveTooth = useCallback(() => {
    dispatch({
      type: 'RESET_ACTIVE_TOOTH',
    })
  }, [dispatch])

  useEffect(() => {
    !enableFilter &&
      dispatch({
        type: 'RESET_FILTER_BY_TYPE',
      })
    diableSelect && handleResetActiveTooth()
  }, [diableSelect, dispatch, enableFilter, handleResetActiveTooth])

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
