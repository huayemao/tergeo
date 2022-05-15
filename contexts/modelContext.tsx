import { useGLTF } from '@react-three/drei'
import dynamic from 'next/dynamic'
import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { MeshBasicMaterial, Scene } from 'three'

const initialData = {
  model: null,
  activeToothName: null,
  defaultMaterial: null,
}

export const ModelContext = createContext(initialData)
export const ModelDispatch = createContext()

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
    case 'RESET_ACTIVE_TOOTH': {
      return Object.assign({}, state, { activeToothName: null })
    }
    case 'SET_DEFAULT_MATERIAL': {
      const { defaultMaterial } = action.payload
      return Object.assign({}, state, { defaultMaterial })
    }
    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const ModelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData)

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
