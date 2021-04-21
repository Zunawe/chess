import React, { FC, useContext, useEffect } from 'react'

import { resetGame } from '../context/actions/app'
import { initializeSocket } from '../context/actions/socket'
import { Board } from '../components'
import { AppContext } from '../context/app'
import { useParams } from 'react-router-dom'

export const Multiplayer: FC = () => {
  const [, dispatch] = useContext(AppContext)
  const { roomCode } = useParams<{ roomCode: string }>()

  useEffect(() => {
    dispatch(resetGame())
    dispatch(initializeSocket(roomCode))
  }, [])

  return (
    <Board />
  )
}
