import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  Reducer,
  ReducerAction,
  Dispatch,
} from 'react'
import {
  Tooth,
  ToothGrowthActionType,
  ToothGrowthStage,
} from '../typings/Tooth'

const teeth: Tooth[] = getAllTeeth()

const initialData = {
  teeth,
}

type ToothPayload = {
  toothName: string
  patch: Record<keyof Tooth, Object>
}

type ToothGrowthActionPayload = Omit<ToothPayload, 'patch'>

type Action =
  | { type: ToothGrowthActionType; payload: ToothGrowthActionPayload }
  | { type: 'SET_TOOTH'; payload: ToothPayload }

export const TeethContext = createContext<typeof initialData>()
export const TeethDispatch = createContext<Dispatch<Action>>()

const reducer = (state: typeof initialData, action: Action) => {
  switch (action.type) {
    case 'SET_TOOTH': {
      const { toothName, patch } = action.payload
      return Object.assign({}, state, {
        teeth: state.teeth.map((e) =>
          e.name === toothName ? { ...e, ...patch } : e
        ),
      })
    }
    case ToothGrowthActionType.ADVANCE: {
      const { toothName } = action.payload
      return Object.assign({}, state, {
        teeth: state.teeth.map(
          (e): Tooth =>
            e.name === toothName ? { ...e, growthStage: e.growthStage + 1 } : e
        ),
      })
    }
    case ToothGrowthActionType.REVERT: {
      const { toothName } = action.payload
      return Object.assign({}, state, {
        teeth: state.teeth.map(
          (e): Tooth =>
            e.name === toothName ? { ...e, growthStage: e.growthStage - 1 } : e
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

  const [state, dispatch] = useReducer<Reducer<typeof initialData, Action>>(
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
