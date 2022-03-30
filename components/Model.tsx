// @ts-nocheck
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { useThree } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'

import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState, Suspense } from 'react'
import { Vector3 } from 'three'

export default function Scene() {
  const gltf = useLoader(
    GLTFLoader,
    'http://localhost:3000/scene.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('http://localhost:3000/draco/')
      loader.setDRACOLoader(dracoLoader)
    }
  )

  const [activeTooth, setActiveTooth] = useState(
    'uploads_files_654350_Indigo+anatomy+upperjaw015'
  )

  const [v, setV] = useState({ x: 0, y: 0, z: 0 })

  const group = gltf.scene.children[0]

  const tooth =
    gltf.nodes[activeTooth] &&
    Object.assign({}, gltf.nodes[activeTooth], {
      visible: true,
      position: v,
      rotation: group.rotation,
    })

  return (
    <div className="h-full bg-blue-400">
      <Suspense fallback={<div>loading</div>}>
        <Canvas camera={{ position: [0, 0.03, 70], fov: 60, near: 10 }}>
          <group>
            <OrbitControls />
            <primitive
              object={gltf.scene}
              onClick={(e) => {
                if (!e?.object.children?.length) {
                  // console.log(e.object)

                  setActiveTooth(e.object.name)
                  const newV = new Vector3(0, 10, 30)

                  setV(newV.add(e.object.geometry.boundingSphere.center))
                  // .sub(group.position).divideScalar(2)
                  e.stopPropagation()
                }
              }}
            />
          </group>
          {tooth && (
            <mesh
              castShadow
              receiveShadow
              geometry={tooth.geometry}
              rotation={group.rotation}
              position={v}
            >
              <Html distanceFactor={1}>
                <div class="content">
                  hello <br />
                  world
                </div>
              </Html>
            </mesh>
          )}
        </Canvas>
      </Suspense>
    </div>
  )
}
