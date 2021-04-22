import React, { FC, useContext, useEffect } from 'react'

import { resetGame } from '../context/actions/app'
import { initializeSocket, joinRoom } from '../context/actions/socket'
import { Board } from '../components'
import { AppContext } from '../context/app'
import { useParams } from 'react-router-dom'

export const Multiplayer: FC = () => {
  const [state, dispatch] = useContext(AppContext)
  const { roomCode } = useParams<{ roomCode: string }>()

  useEffect(() => {
    dispatch(resetGame())
    dispatch(initializeSocket())
  }, [])

  useEffect(() => {
    if (state.socket !== null) {
      dispatch(joinRoom(roomCode))
    }
  }, [state.socket])

  return (
    <>
      <Board perspective={state.color} />
    </>
  )
}
