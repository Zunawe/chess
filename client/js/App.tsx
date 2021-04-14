import React, { FC } from 'react'
// import React, { FC, useContext } from 'react'

// import { setCounter, slowlyDecrementCounter } from './context/actions/app'
import { Board } from './components'
// import { AppContext } from './context/app'

export const App: FC = () => {
  // const [state, dispatch] = useContext(AppContext)

  return (
    <Board perspective='L' />
  )
}
