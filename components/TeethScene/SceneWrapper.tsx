import { Canvas } from '@react-three/fiber'
import React, { Suspense, memo } from 'react'
import { useModel, useModelDispatch } from '../../contexts/modelContext'
import { useTeeth } from '../../contexts/teethContext'
import Loader from './Loader'
import { Props as CanvasProps } from '@react-three/fiber/dist/declarations/src/'
import { Model } from './Model'

export function SceneWrapper({
  canvasProps,
  getScene,
  diableSelect = false,
  enableFilter = false,
  ...props
}: {
  diableSelect: boolean
  canvasProps: CanvasProps
  diableFilter: boolean
}) {
  const teethContext = useTeeth()
  const dispatch = useModelDispatch()
  const modelContext = useModel() || {}
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 15, -72], fov: 70, near: 10 }}
      {...canvasProps}
    >
      <Suspense fallback={<Loader />}>
        <Model
          {...{
            canvasProps,
            getScene,
            diableSelect,
            enableFilter,
            dispatch,
            modelContext,
            teethContext,
          }}
          {...props}
        />
      </Suspense>
    </Canvas>
  )
}

export default memo(SceneWrapper)
