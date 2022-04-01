import React, { createContext, useReducer, useContext, useEffect } from 'react'
export const ModelContext = createContext()
export const ModelDispatch = createContext()

const initialData = {
  scene: false,
  activeToothName: null,
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
    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const ModelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  

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
