import { io, Socket } from 'socket.io-client'
import * as Chess from 'chess-utils'

import { Action } from './Action'
import { Thunk } from '../middlewares'
import { setColor, setGame } from './app'

export class SetSocketAction extends Action {}
export const setSocket = (socket: Socket): SetSocketAction => (new SetSocketAction(socket))

export const joinRoom: (roomCode: string, color?: Chess.Color) => Thunk = (roomCode: string, color?: Chess.Color) => {
  return (dispatch, getState) => {
    const { socket } = getState()
    if (socket === null) throw new Error('Socket not initialized')

    socket.on('join', () => {
      console.log('A player has joined')
      dispatch(resyncGame())
    })

    socket.on('color', (color: Chess.Color) => {
      console.log(`You're playing as ${color}`)
      dispatch(setColor(color))
    })

    socket.on('full', () => {
      console.log('Room is full')
      location.href = '/chess'
    })

    socket.on('sync', (serializedGame) => {
      console.log('Resyncing game...')
      dispatch(setGame(Chess.deserializeGame(serializedGame)))
    })

    socket.emit('join', roomCode, color)
  }
}

export const initializeSocket: () => Thunk = () => {
  return (dispatch, getState) => {
    dispatch(setSocket(io()))
  }
}

export const sendLastMove: (game: Chess.Game) => Thunk = (game: Chess.Game) => {
  return (dispatch, getState) => {
    const { socket } = getState()
    if (socket === null) throw new Error('Socket not initialized')

    socket.emit('move', Chess.serializeMove(game.moves[game.moves.length - 1]))
  }
}

export const resyncGame: () => Thunk = () => {
  return (dispatch, getState) => {
    const { socket } = getState()
    if (socket === null) throw new Error('Socket not initialized')

    socket.emit('sync')
  }
}
