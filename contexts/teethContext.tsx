import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  Reducer,
  ReducerAction,
  Dispatch,
} from 'react'
import { getAllTeeth } from '../lib/teeth'
import {
  PermanentToothType,
  Tooth,
  ToothGrowthActionType,
  ToothGrowthRecord,
  ToothGrowthStage,
} from '../typings/Tooth'

const teeth: Tooth[] = getAllTeeth()

const initialData = {
  teeth,
  filters: {
    type: null,
  },
}

type ToothPayload = {
  toothName: string
  patch: Record<keyof Tooth, Object>
}

type ToothGrowthActionPayload = {
  toothName: string
  record: ToothGrowthRecord
}

type Action =
  | { type: ToothGrowthActionType; payload: ToothGrowthActionPayload }
  | { type: 'SET_TOOTH'; payload: ToothPayload }
  | { type: 'FILTER_BY_TYPE'; payload: PermanentToothType }
  | { type: 'RESET_FILTER_BY_TYPE' }

export const TeethContext = createContext<typeof initialData>({})
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
    case 'FILTER_BY_TYPE': {
      return Object.assign({}, state, {
        filters: {
          type: action.payload,
        },
      })
    }
    case 'RESET_FILTER_BY_TYPE': {
      return Object.assign({}, state, {
        filters: {
          type: null,
        },
      })
    }
    case ToothGrowthActionType.ADVANCE: {
      const { toothName, record } = action.payload

      return Object.assign({}, state, {
        teeth: state.teeth.map(
          (e): Tooth =>
            e.name === toothName
              ? {
                  ...e,
                  growthStage: e.growthStage + 1,
                  growthRecord: e.growthRecord?.concat(record) || null,
                }
              : e
        ),
      })
    }
    case ToothGrowthActionType.REVERT: {
      const { toothName, record } = action.payload

      return Object.assign({}, state, {
        teeth: state.teeth.map(
          (e): Tooth =>
            e.name === toothName
              ? {
                  ...e,
                  growthStage: e.growthStage - 1,
                  growthRecord: e.growthRecord?.concat(record) || null,
                }
              : e
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
