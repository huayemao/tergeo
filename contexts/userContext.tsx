import React, { createContext, useReducer, useContext, useEffect } from 'react'
import { Mode } from '../typings/user'
export const UserContext = createContext()
export const UserDispatch = createContext()

export const getAvailableModes = (user) => {
  return user.child ? [Mode.usual, Mode.usual] : [Mode.usual]
}

const initialData = {
  mode: Mode.usual,
  child: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODE': {
      const { payload } = action
      return Object.assign({}, state, { mode: payload })
    }
    case 'PATCH_CHILD_INFO': {
      const { payload } = action
      return Object.assign({}, state, {
        child: { ...state.child, ...payload },
      })
    }
    default: {
      throw new Error('Unhandled action type.')
    }
  }
}

const UserProvider = ({ children }) => {
  const storageData =
    typeof window !== 'undefined' ? localStorage.getItem('BIANBEI_USER') : null

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(storageData) || initialData
  )

  useEffect(() => {
    localStorage.setItem('BIANBEI_USER', JSON.stringify(state))
  }, [state])

  return (
    <UserContext.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserContext.Provider>
  )
}

export default UserProvider

export function useUser() {
  return useContext(UserContext)
}

export function useUserDispatch() {
  return useContext(UserDispatch)
}
