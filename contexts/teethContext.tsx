import React, { createContext, useReducer, useContext, useEffect } from 'react'
export const TeethContext = createContext()
export const TeethDispatch = createContext()

const locations = ['tr', 'tl', 'bl', 'br']
const nums = Array.from({ length: 8 }, (e, i) => i + 1)

const teethNames = locations.flatMap((e) => nums.map((el) => e + el))

const initialData = {
  teeth: teethNames.map((e) => ({
    name: e,
    grown: false,
  })),
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOOTH': {
      const { toothName, patch } = action.payload

      return Object.assign({}, state, {
        teeth: state.teeth.map((e) =>
          e.name === toothName ? { ...e, ...patch } : e
        ),
      })
    }

    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const TeethProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData)

  return (
    <TeethContext.Provider value={state}>
      <TeethDispatch.Provider value={dispatch}>
        {children}
      </TeethDispatch.Provider>
    </TeethContext.Provider>
  )
}

export default TeethProvider

export function useTeeth() {
  return useContext(TeethContext)
}

export function useTooth(toothName) {
  return useContext(TeethContext)?.teeth?.find((e) => e.name === toothName)
}

export function useTeethDispatch() {
  return useContext(TeethDispatch)
}
