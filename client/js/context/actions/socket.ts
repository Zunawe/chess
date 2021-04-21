import * as Chess from 'chess-utils'

import { Thunk } from '../middlewares'
import { setGame, setRoomCode } from './app'

export const initializeSocket: (roomCode: string) => Thunk = (roomCode: string) => {
  return (dispatch, getState) => {
    const { socket } = getState()

    socket.on('connect', () => {
      console.log('Connected')
    })

    socket.on('joined', (roomCode: string) => {
      console.log(`Joined room ${roomCode}`)
      dispatch(setRoomCode(roomCode))
      dispatch(resyncGame())
    })

    socket.on('full', () => {
      console.log('Room is full')
    })

    socket.on('sync', (encodedGame) => {
      dispatch(setGame(Chess.decodeGame(encodedGame)))
    })

    dispatch(joinRoom(roomCode))
  }
}

export const sendLastMove: (game: Chess.Game) => Thunk = (game: Chess.Game) => {
  return (dispatch, getState) => {
    const { roomCode, socket } = getState()
    socket.emit('move', roomCode, Chess.encodeMove(game.moves.length - 1, game))
  }
}

export const resyncGame: () => Thunk = () => {
  return (dispatch, getState) => {
    getState().socket.emit('sync')
  }
}

export const joinRoom: (code: string) => Thunk = (code: string) => {
  return (dispatch, getState) => {
    getState().socket.emit('join', code)
  }
}
