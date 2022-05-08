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
import React, { useRef, Suspense, useMemo, useCallback } from 'react'
import { Color, Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useModel, useModelDispatch } from '../../contexts/modelContext'
import { useFetchModel } from '../useFetchModel'
import { getMaterials4tooth } from '../../lib/getMaterials4tooth'
import { useTeeth } from '../../contexts/teethContext'

export const indigo = new Color(99 / 256, 102 / 256, 241 / 256)
export const teal = new Color(13 / 256, 148 / 256, 136 / 256)

export const GROWN_TEETH = ['bl1', 'br1']

export default function Scene() {
  const dispatch = useModelDispatch()
  const { model, activeToothName = 'tl8', standardMaterial } = useModel()
  const { teeth } = useTeeth()
  const teethCount = teeth?.filter((e) => e.grown).length

  const setactiveToothName = useCallback(
    (toothName) => {
      dispatch({
        type: 'SET_ACTIVE_TOOTH',
        payload: { toothName },
      })
    },
    [dispatch]
  )

  const { lower, upper } = model?.nodes || {}

  const scene = useMemo(() => {
    const clonedScene = model?.scene.clone()

    clonedScene?.traverse((e) => {
      if (e.type === 'Mesh') {
        e.material = standardMaterial
      }
      if (e.name === 'lower') {
        ;(e as Group).rotation.set(
          -0.25,
          -0.03490658382473835,
          -2.3180744649745875e-10
        )
        ;(e as Group).position.add(new Vector3(0, -8, 0))
      }
      if (e.name === 'upper') {
        ;(e as Group).rotation.set(0.2, 0, 0)
        ;(e as Group).position.add(new Vector3(0, 8, 0))
      }
    })

    return clonedScene
  }, [model])



  return (
    model && (
      <div>
        <Canvas
          shadows
          dpr={[1, 2]}
          style={{ height: '36vh' }}
          camera={{ position: [0, 15, -72], fov: 70, near: 10 }}
        >
          <primitive object={scene}>
            <Html
              className="w-48 bg-white bg-opacity-70 p-2 text-sm backdrop-blur-lg backdrop-filter"
              calculatePosition={(el, c, size) => {
                return [size.width - 192, 0]
              }}
            >
              <p className="leading-3 text-gray-500">
                <span className="text-base font-semibold text-indigo-400 ">
                  刷牙
                </span>
              </p>
            </Html>
          </primitive>
          <Environment path="http://localhost:3000/" preset="studio" />
        </Canvas>
        
      </div>
    )
  )
}
