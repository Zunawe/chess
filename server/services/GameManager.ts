import { applyMove, decodeMove, Game, gameFromMoves } from 'chess-utils'
import { logger } from '../util'

const games = new Map<string, Game>()

export const getGame = (code: string): Game | undefined => games.get(code)
export const gameExists = (code: string): boolean => games.has(code)
export const createGame = (code: string): Game => {
  logger.debug(`Created new game [${code}]`)
  const game = gameFromMoves([])
  games.set(code, game)
  return game
}
export const removeGame = (code: string): void => {
  logger.debug(`Cleaning up game [${code}]`)
  games.delete(code)
}
export const makeMove = (code: string, move: string): Game => {
  const game = getGame(code)
  if (game === undefined) {
    throw new Error(`Cannot make move, game not found: [${code}]`)
  }

  logger.debug(`Making move ${move} in game [${code}]`)
  const newGame = applyMove(decodeMove(move, game.moves), game)
  games.set(code, newGame)
  return newGame
}
