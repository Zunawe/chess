import React, { FC, createContext } from 'react'

import { useEnhancedReducer } from '../hooks'
import { thunkMiddleware } from './middlewares'
import { reducer } from './reducers/app'

const initialState: State = {
  board: [],
  dragging: false,
  selected: null
}

export const AppContext = createContext<[State, Dispatch, () => State]>([initialState, () => {}, () => initialState])

export const AppContextProvider: FC = ({ children }) => {
  const store = useEnhancedReducer(reducer, initialState, undefined, [thunkMiddleware])

  return (
    <AppContext.Provider value={[store.state, store.dispatch, store.getState]}>
      {children}
    </AppContext.Provider>
  )
}
