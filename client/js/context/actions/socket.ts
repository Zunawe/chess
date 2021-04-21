import * as Chess from 'chess-utils'

import { Thunk } from '../middlewares'
import { resetGame, setGame, setRoom, setPerspective } from './app'

export const initializeSocket: () => Thunk = () => {
  return (dispatch, getState) => {
    const { socket } = getState()

    socket.on('connect', () => {
      console.log('Connected')
    })

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
  }
}

export const sendLastMove: (game: Chess.Game) => Thunk = (game: Chess.Game) => {
  return (dispatch, getState) => {
    const { room, socket } = getState()
    socket.emit('move', room, Chess.encodeMove(game.moves.length - 1, game))
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
