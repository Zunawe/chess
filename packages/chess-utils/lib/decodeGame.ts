import { applyMove, Game } from '.'
import { decodeMove } from './decodeMove'
import { gameFromMoves } from './gameFromMoves'

export const decodeGame = (encodedGame: string): Game => {
  return encodedGame.split(' ')
    .reduce((game, encodedMove) => {
      return applyMove(decodeMove(encodedMove, game.moves), game)
    }, gameFromMoves([]))
}
