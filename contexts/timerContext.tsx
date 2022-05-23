import React, { createContext, useReducer, useContext, useEffect } from 'react'
export const TimerContext = createContext()
export const TimerDispatch = createContext()

const initialData = {
  seconds: 0,
  isActive: false,
  historyRecords: [],
  message: null,
  playIndex: 0,
  reseted: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return Object.assign({}, state, {
        seconds: state.seconds + 1,
      })
    }
    case 'START': {
      return Object.assign({}, state, {
        seconds: 0,
        isActive: true,
      })
    }
    case 'STOP': {
      return Object.assign({}, state, {
        isActive: false,
      })
    }
    case 'TOGGLE_START': {
      if (!state.isActive) {
        return Object.assign({}, state, {
          isActive: !state.isActive,
          seconds: !state.isActive ? 0 : state.seconds,
        })
      }
      return Object.assign({}, state, {
        message: state.isActive ? '确定要结束吗？' : null,
      })
    }
    case 'CONFIRM_END': {
      return Object.assign({}, state, {
        seconds: 0,
        isActive: false,
        message: null,
        reseted: true,
      })
    }
    case 'CANCEL_END': {
      return Object.assign({}, state, {
        message: null,
      })
    }
    case 'SET_RECORDS': {
      const { payload } = action
      return Object.assign({}, state, {
        historyRecords: payload,
      })
    }

    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const TimerProvider = ({ children }) => {
  const storageData =
    typeof window !== 'undefined'
      ? localStorage.getItem('HITSTORY_RECORDS')
      : null

  const [state, dispatch] = useReducer(
    reducer,
    Object.assign(initialData, JSON.parse(storageData))
  )

  useEffect(() => {
    const payload = getHistoryRecord(state)
    if (payload) {
      dispatch({ type: 'SET_RECORDS', payload })
      localStorage.setItem(
        'HITSTORY_RECORDS',
        JSON.stringify({ historyRecords: payload })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isActive])

  return (
    <TimerContext.Provider value={state}>
      <TimerDispatch.Provider value={dispatch}>
        {children}
      </TimerDispatch.Provider>
    </TimerContext.Provider>
  )
}

const getHistoryRecord = (state) => {
  const timeStamp = new Date().toLocaleString()
  const lastRecord = [...state.historyRecords].pop()
  if (!state.isActive) {
    if (lastRecord?.length !== 1) {
      return null
    }
    return state.historyRecords
      .slice(0, -1)
      .concat([lastRecord.concat(timeStamp)])
  } else {
    return [...state.historyRecords].concat([[timeStamp]])
  }
}

export default TimerProvider

export function useTimer() {
  return useContext(TimerContext)
}

export function useTimerDispatch() {
  return useContext(TimerDispatch)
}
