import { Game, Board } from '.'
import { createGame } from './createGame'
import { decodeMove } from './decodeMove'

export const decodeGame = (encodedGame: string, initialBoard?: Board): Game => {
  return encodedGame.split(' ')
    .filter((move) => move !== '' && move !== ' ')
    .reduce<Game>((game, encodedMove) => ({
    ...game,
    moves: [...game.moves, decodeMove(encodedMove, game)]
  }), createGame([], initialBoard))
}
