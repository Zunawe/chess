import React, { FC, useCallback, useContext, useEffect, useState } from 'react'

import { resetGame } from './context/actions/app'
import { initializeSocket, joinRoom } from './context/actions/socket'
import { Board, Button, TextInput } from './components'
import { AppContext } from './context/app'

export const App: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    dispatch(resetGame())
  }, [])

  useEffect(() => {
    dispatch(initializeSocket())
  }, [])

  const handleClick = useCallback(() => {
    dispatch(joinRoom(inputValue))
  }, [inputValue])

  const handleChange = useCallback((value) => {
    setInputValue(value)
  }, [setInputValue])

  return (
    <>
      <div style={{ margin: 'auto', width: 'fit-content', padding: '1vmin' }}>
        <TextInput onChange={handleChange} value={inputValue} />
        <Button onClick={handleClick}>Join</Button>
      </div>
      <Board />
    </>
  )
}
