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
import React, { useRef, useState, Suspense, useMemo, useCallback } from 'react'
import { Color, Group, Material, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useModel, useModelDispatch } from '../../contexts/modelContext'
import { useFetchModel } from '../useFetchModel'
import { getMaterials4tooth } from '../../lib/getMaterials4tooth'
import { useTeeth } from '../../contexts/teethContext'
import { ORIGIN } from '../../constants/origin'

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

  const scene = useMemo(() => {
    const clonedScene = model && model.scene.clone()
    clonedScene?.traverse((e) => {
      if (e.type === 'Mesh') {
        e.material = getMaterials4tooth(
          standardMaterial,
          e,
          teeth,
          activeToothName
        )
      }
    })
    return clonedScene
  }, [activeToothName, model, teeth])

  return (
    model && (
      <Canvas
        shadows
        dpr={[1, 2]}
        style={{ height: '36vh' }}
        camera={{ position: [0, 8, 72], fov: 70, near: 10 }}
      >
        <OrbitControls makeDefault enableDamping />
        <primitive
          object={scene}
          onClick={(e) =>
            e.object.type === 'Mesh' && setactiveToothName(e.object.name)
          }
        >
          <Html
            className="w-48 bg-white bg-opacity-70 p-2 text-sm backdrop-blur-lg backdrop-filter"
            calculatePosition={(el, c, size) => {
              return [size.width - 192, 0]
            }}
          >
            <p className="leading-3 text-gray-500">
              花野猫
              <span className="text-base font-semibold text-indigo-400 ">
                六个月零8天
              </span>
              啦，已经坚韧地长出了{' '}
              <span className="text-base font-semibold text-indigo-400">
                {teethCount} 颗
              </span>
              牙
            </p>
          </Html>
        </primitive>
        <Environment path={ORIGIN} preset="studio" />
      </Canvas>
    )
  )
}
