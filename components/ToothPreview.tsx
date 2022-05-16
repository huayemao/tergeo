import dynamic from 'next/dynamic'
import { Vector3 } from 'three'

const Scene = dynamic(() => import('./TeethScene'), {
  ssr: false,
})

function getScene(modelContext: any, teethContext: any) {
  const { model, defaultMaterial, activeToothName } = modelContext
  const [group, ...rest] = (model && model.scene.children) || []

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

    clonedTooth.material = defaultMaterial

    return clonedTooth
  } else {
    return null
  }
}

export default function PreviewScene() {
  const canvasProps = {
    camera: { position: [0, 0.03, 40], fov: 40, near: 6 },
  }
  return (
    <div className="m-2 mb-10 w-32 rounded-tl-3xl border-8 border-white bg-indigo-50  p-2 shadow-lg">
      <Scene canvasProps={canvasProps} getScene={getScene} />
    </div>
  )
}
