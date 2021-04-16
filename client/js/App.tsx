import React, { FC, useContext, useEffect } from 'react'

import { resetBoard } from './context/actions/app'
import { Board } from './components'
import { AppContext } from './context/app'

export const App: FC = () => {
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    dispatch(resetBoard())
  }, [])

  return (
    <Board />
  )
}
