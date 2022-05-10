import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { ToothGrowthStage } from '../typings/Tooth'

const teeth: Tooth[] = getAllTeeth()

const initialData = {
  teeth,
}

export const TeethContext = createContext<typeof initialData>()
export const TeethDispatch = createContext()

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
  const storageData =
    typeof window !== 'undefined' ? localStorage.getItem('TEETH_STATE') : null

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(storageData) || initialData
  )

  useEffect(() => {
    localStorage.setItem('TEETH_STATE', JSON.stringify(state))
  }, [state])

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
  return useContext(TeethContext).teeth.find((e) => e.name === toothName)
}

export function useTeethDispatch() {
  return useContext(TeethDispatch)
}

function getAllTeeth() {
  const locations = ['tr', 'tl', 'bl', 'br']
  const nums = Array.from({ length: 8 }, (e, i) => i + 1)
  const teethNames = locations.flatMap((e) => nums.map((el) => e + el))

  const teeth: Tooth[] = teethNames.map((e) => ({
    name: e,
    growthStage:
      e.split('')[2] > 4
        ? ToothGrowthStage.permanent_unteethed
        : ToothGrowthStage.primary_unteethed,
  }))
  return teeth
}
