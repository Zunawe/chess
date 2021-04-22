import * as Chess from 'chess-utils'
import { logger } from '../util'

export interface Room {
  game: Chess.Game
  players: {
    W: string | null
    B: string | null
  }
}

const rooms = new Map<string, Room>()

export const getRoom = (code: string): Room | undefined => rooms.get(code)
export const roomExists = (code: string): boolean => rooms.has(code)

export const createRoom = (code: string): Room => {
  logger.debug(`Created new game [${code}]`)
  const room = {
    game: Chess.createGame(),
    players: {
      W: null,
      B: null
    }
  }
  rooms.set(code, room)
  return room
}

export const removeRoom = (code: string): void => {
  logger.debug(`Cleaning up room [${code}]`)
  rooms.delete(code)
}

export const makeMove = (code: string, move: string): Room => {
  const room = getRoom(code)
  if (room === undefined) {
    throw new Error(`Cannot make move, game not found: [${code}]`)
  }

  const { game } = room
  const newRoom: Room = {
    ...room,
    game: Chess.createGame([...game.moves, Chess.deserializeMove(move)], game.initialBoard)
  }
  rooms.set(code, newRoom)

  logger.debug(`Making move ${move} in game [${code}]`)
  return newRoom
}

export const addPlayer = (code: string, username: string, color: Chess.Color): void => {
  const room = getRoom(code)
  if (room === undefined) {
    throw new Error(`Cannot add player, game not found: [${code}]`)
  }

  logger.debug(`Setting player ${username} to color ${color}`)
  room.players[color] = username
  rooms.set(code, room)
}

export const removePlayer = (code: string, username: string): void => {
  const room = getRoom(code)
  if (room === undefined) {
    throw new Error(`Cannot remove player, game not found: [${code}]`)
  }

  logger.debug(`Player ${username} leaving match`)

  const isW = room.players.W === username
  const isB = room.players.B === username

  if (isW) room.players.W = null
  if (isB) room.players.B = null

  rooms.set(code, room)
}
