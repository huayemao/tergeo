import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import { useModel, useModelDispatch } from '../../contexts/modelContext'
import { useTeeth, useTeethDispatch } from '../../contexts/teethContext'
import Loader from './Loader'

export function SceneWrapper({
  children,
  canvasProps = {},
  modelComponent: Model,
  ...props
}) {
  const teethContext = useTeeth()
  const dispatch = useModelDispatch()
  const teethDispatch = useTeethDispatch()
  const modelContext = useModel() || {}
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 15, -72], fov: 70, near: 10 }}
      {...canvasProps}
    >
      <Suspense fallback={<Loader />}>
        {children}
        <Model
          {...props}
          {...{ dispatch, modelContext, teethContext, teethDispatch }}
        />
      </Suspense>
    </Canvas>
  )
}
