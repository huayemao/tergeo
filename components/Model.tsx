// @ts-nocheck

import { useThree } from '@react-three/fiber'
import { Html, Preload, OrbitControls, Select } from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, Suspense, useMemo, useCallback } from 'react'
import { Color, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useModel, useModelDispatch } from '../contexts/modelContext'
import { useFetchModel } from './useFetchModel'

const indigo = new Color(99 / 256, 102 / 256, 241 / 256)

export default function Scene() {
  const dispatch = useModelDispatch()
  useFetchModel()
  const {
    model,
    activeToothName = 'uploads_files_654350_Indigo+anatomy+upperjaw015',
  } = useModel()

  const setactiveToothName = useCallback(
    (toothName) => {
      dispatch({
        type: 'SET_ACTIVE_TOOTH',
        payload: { toothName },
      })
    },
    [dispatch]
  )

  const oldMaterial =
    model &&
    model.nodes[
      'uploads_files_654350_Indigo+anatomy+upperjaw013'
    ].material.clone()

  const scene = useMemo(() => {
    model?.scene.traverse((e) => {
      if (e.type === 'Mesh') {
        if (e.name === activeToothName) {
          tint(e)
        } else {
          unTint(e)
        }
      }
    })

    function tint(tooth) {
      const newMaterial = oldMaterial.clone()
      newMaterial.color = indigo
      tooth.material = newMaterial
    }

    function unTint(tooth) {
      tooth.material = oldMaterial
    }

    return model?.scene
  }, [activeToothName, model])

  return (
    <Canvas
      className="bg-opacity-30"
      style={{ height: '36vh' }}
      camera={{ position: [0, 8, 72], fov: 70, near: 10 }}
    >
      <OrbitControls />
      <primitive
        object={scene}
        onClick={(e) =>
          e.object.type === 'Mesh' && setactiveToothName(e.object.name)
        }
      >
        <Html
          className="w-screen bg-white bg-opacity-30 p-4 text-sm"
          calculatePosition={(el, c, size) => {
            return [0, 0]
          }}
        >
          <p className="text-gray-500">
            花野猫
            <span className="text-base font-semibold text-indigo-400">
              一岁零三个月
            </span>
            啦，已经坚韧地长出了{' '}
            <span className="text-base font-semibold text-indigo-400">
              2 颗
            </span>
            牙
          </p>
        </Html>
      </primitive>
    </Canvas>
  )
}
