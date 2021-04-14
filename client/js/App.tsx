import React, { FC, useContext, useEffect } from 'react'

import { movePiece, resetBoard } from './context/actions/app'
import { Board } from './components'
import { AppContext } from './context/app'

export const App: FC = () => {
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    dispatch(resetBoard())
  }, [])
  useEffect(() => {
    setTimeout(() => dispatch(movePiece({ rank: 1, file: 0 }, { rank: 3, file: 0 })), 2000)
  }, [])

  return (
    <Board perspective='L' />
  )
}
