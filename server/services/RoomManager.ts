import * as Chess from 'chess-utils'
import { logger } from '../util'

export interface Room {
  game: Chess.Game
  players: {
    L: string | null
    D: string | null
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
      L: null,
      D: null
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
    game: Chess.createGame([...game.moves, Chess.decodeMove(move, game)], game.initialBoard)
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

  const isL = room.players.L === username
  const isD = room.players.L === username

  if (isL) room.players.L = null
  if (isD) room.players.D = null

  rooms.set(code, room)
}
