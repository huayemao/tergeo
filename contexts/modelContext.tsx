import { useGLTF } from '@react-three/drei'
import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { MeshBasicMaterial, Scene } from 'three'
import { useFetchModel } from '../components/useFetchModel'
export const ModelContext = createContext()
export const ModelDispatch = createContext()

const initialData = {
  model: null,
  activeToothName: null,
  standardMaterial: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODEL': {
      const { model } = action.payload
      return Object.assign({}, state, { model })
    }
    case 'SET_ACTIVE_TOOTH': {
      const { toothName } = action.payload
      return Object.assign({}, state, { activeToothName: toothName })
    }
    case 'SET_STANDARD_MATERIAL': {
      const { standardMaterial } = action.payload
      return Object.assign({}, state, { standardMaterial })
    }
    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const ModelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData)
  const gltf = useGLTF(
    'http://localhost:3000/scene.glb',
    'http://localhost:3000/draco'
  )

  useEffect(() => {
    const { model, standardMaterial } = state

    if (!model) {
      dispatch({
        type: 'SET_MODEL',
        payload: {
          model: Object.assign({}, gltf),
        },
      })
    }
    if (!standardMaterial) {
      dispatch({
        type: 'SET_STANDARD_MATERIAL',
        payload: {
          standardMaterial: gltf.nodes['tl8'].material.clone(),
        },
      })
    }

    return () => {
      if (model) {
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
    }
  }, [])

  return (
    <ModelContext.Provider value={state}>
      <ModelDispatch.Provider value={dispatch}>
        {children}
      </ModelDispatch.Provider>
    </ModelContext.Provider>
  )
}

export default ModelProvider

export function useModel() {
  return useContext(ModelContext)
}

export function useModelDispatch() {
  return useContext(ModelDispatch)
}
