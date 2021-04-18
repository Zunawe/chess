import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import * as Chess from 'chess-utils'

import { resetGame, setGame, setRoom, setPerspective } from './context/actions/app'
import { Board, Button, TextInput } from './components'
import { AppContext } from './context/app'
import { useSocket } from './hooks/useSocket'

export const App: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [, dispatch] = useContext(AppContext)

  useEffect(() => {
    dispatch(resetGame())
  }, [])

  const socket = useSocket()
  const handleClick = useCallback(() => {
    socket.emit('join', inputValue)

    socket.on('joined', (code: string, color: Chess.Color) => {
      console.log(`Joined room ${code}`)
      dispatch(resetGame())
      dispatch(setRoom(code))
      dispatch(setPerspective(color))
    })

    socket.on('full', () => {
      console.log('Room is full')
    })

    socket.on('sync', (encodedGame) => {
      dispatch(setGame(Chess.decodeGame(encodedGame)))
    })

    socket.on('disconnect', () => {
      dispatch(setRoom(''))
      dispatch(setPerspective('L'))
      dispatch(resetGame())
    })
  }, [socket, inputValue])

  const handleChange = useCallback((value) => {
    setInputValue(value)
  }, [setInputValue])

  return (
    <>
      <div style={{ margin: 'auto', width: 'fit-content', padding: '1vmin' }}>
        <TextInput onChange={handleChange} value={inputValue} />
        <Button onClick={handleClick}>Join</Button>
        <Button onClick={() => socket.disconnect()}>Disconnect</Button>
      </div>
      <Board />
    </>
  )
}
