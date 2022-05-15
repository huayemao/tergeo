import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { ORIGIN } from '../../constants/origin'
import { useModel, useModelDispatch } from '../../contexts/modelContext'

export function useFetchModel(dispatch, modelContext) {
  const { model, defaultMaterial } = modelContext

  const gltf = useGLTF(ORIGIN + 'scene.glb', true)

  useEffect(() => {
    if (!model) {
      dispatch &&
        dispatch({
          type: 'SET_MODEL',
          payload: {
            model: Object.assign({}, gltf),
          },
        })
    }
    if (!defaultMaterial) {
      dispatch &&
        dispatch({
          type: 'SET_DEFAULT_MATERIAL',
          payload: {
            defaultMaterial: gltf.nodes['tl8'].material.clone(),
          },
        })
    }
  }, [dispatch, gltf, model, defaultMaterial])
}
