import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { ORIGIN } from '../../constants/origin'
import { useModel, useModelDispatch } from '../../contexts/modelContext'

export function useFetchModel(dispatch, modelContext) {
  const { model, standardMaterial } = modelContext

  const gltf = useGLTF(
    ORIGIN + 'scene.glb',
    'https://www.gstatic.com/draco/v1/decoders/'
  )

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
    if (!standardMaterial) {
      dispatch &&
        dispatch({
          type: 'SET_STANDARD_MATERIAL',
          payload: {
            standardMaterial: gltf.nodes['tl8'].material.clone(),
          },
        })
    }
  }, [dispatch, gltf, model, standardMaterial])

  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_MODEL',
        payload: {
          model: null,
        },
      })

      dispatch({
        type: 'SET_STANDARD_MATERIAL',
        payload: {
          standardMaterial: null,
        },
      })
    }
  }, [dispatch])
}
