// @ts-nocheck
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useMemo } from 'react'
import { Color, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import { useModel } from '../contexts/modelContext'

export default function ToothPreview() {
  const { model, activeToothName, standardMaterial } = useModel()

  const [group, ...rest] = (model && model.scene.children) || []

  const tooth = useMemo(() => {
    const rawTooth = model && model.nodes[activeToothName]

    if (rawTooth) {
      const clonedTooth: Mesh = rawTooth.clone()
      clonedTooth.setRotationFromEuler(group.rotation)

      clonedTooth.position
        .setX(0)
        .setY(-28)
        .setZ(0)
        .add(clonedTooth.geometry.boundingSphere.center)

      if (rawTooth.parent?.name === 'lower') {
        clonedTooth.position.add(new Vector3(0, 14, 0))
      }

      clonedTooth.material = standardMaterial

      return clonedTooth
    } else {
      return null
    }
  }, [model, activeToothName])

  return (
    <div className="m-2 mb-10 w-32 rounded-tl-3xl border-8 border-white bg-indigo-50  p-2 shadow-lg">
      <Canvas camera={{ position: [0, 0.03, 40], fov: 40, near: 6 }}>
        <OrbitControls />
        {tooth && <primitive object={tooth}></primitive>}
        {rest.map((e) => (
          <primitive key={e.uuid} object={e.clone()}></primitive>
        ))}
        <Environment files="studio_small_03_1k.hdr" />
      </Canvas>
    </div>
  )
}
