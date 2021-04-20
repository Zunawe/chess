import * as Chess from 'chess-utils'
import { logger } from '../util'

const games = new Map<string, Chess.Game>()

export const getGame = (code: string): Chess.Game | undefined => games.get(code)
export const gameExists = (code: string): boolean => games.has(code)
export const createGame = (code: string): Chess.Game => {
  logger.debug(`Created new game [${code}]`)
  const game = Chess.createGame()
  games.set(code, game)
  return game
}
export const removeGame = (code: string): void => {
  logger.debug(`Cleaning up game [${code}]`)
  games.delete(code)
}
export const makeMove = (code: string, move: string): Chess.Game => {
  const game = getGame(code)
  if (game === undefined) {
    throw new Error(`Cannot make move, game not found: [${code}]`)
  }

  logger.debug(`Making move ${move} in game [${code}]`)
  const newGame = Chess.createGame([...game.moves, Chess.decodeMove(move, game)], game.initialBoard)
  games.set(code, newGame)
  return newGame
}
