import React, { createContext, useReducer, useContext, useEffect } from 'react'
export const TimerContext = createContext()
export const TimerDispatch = createContext()

const initialData = {
  seconds: 0,
  isActive: false,
  message: null,
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
        isActive: false,
        message: null,
      })
    }
    case 'CANCEL_END': {
      return Object.assign({}, state, {
        message: null,
      })
    }

    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData)

  return (
    <TimerContext.Provider value={state}>
      <TimerDispatch.Provider value={dispatch}>
        {children}
      </TimerDispatch.Provider>
    </TimerContext.Provider>
  )
}

export default TimerProvider

export function useTimer() {
  return useContext(TimerContext)
}

export function useTimerDispatch() {
  return useContext(TimerDispatch)
}
