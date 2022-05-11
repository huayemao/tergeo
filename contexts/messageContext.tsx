import React, { createContext, useReducer, useContext, useEffect } from 'react'

const initialData = {
  message: null,
  duration: null,
}

export const MessageContext = createContext(initialData)
export const MessageDispatch = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      const { payload } = action
      return Object.assign({}, state, payload)
    }
    case 'CLEAR_MESSAGE': {
      const { payload } = action
      return initialData
    }
    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData)

  return (
    <MessageContext.Provider value={state}>
      <MessageDispatch.Provider value={dispatch}>
        {children}
      </MessageDispatch.Provider>
    </MessageContext.Provider>
  )
}

export default MessageProvider

export function useMessage() {
  return useContext(MessageContext)
}

export function useShowMessage() {
  const dispatch = useContext(MessageDispatch)
  return (content, duration = 1200) => {
    dispatch({
      type: 'SET_MESSAGE',
      payload: {
        message: content,
        duration,
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })
    }, duration)
  }
}

export function useMessageDispatch() {
  return useContext(MessageDispatch)
}
