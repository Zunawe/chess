import { Game, Board } from '.'
import { createGame } from './createGame'
import { moveFromPgn } from './moveFromPgn'

export const gameFromPgn = (encodedGame: string, initialBoard?: Board): Game => {
  return [...encodedGame.matchAll(/(?:\d+\. ([^ ]+) ?([^ ]+)? ?)/g)]
    .reduce((acc, [, move1, move2]) => {
      return move2 === undefined ? [...acc, move1] : [...acc, move1, move2]
    }, [])
    .reduce((game, encodedMove) => {
      return {
        ...game,
        moves: [...game.moves, moveFromPgn(encodedMove, game)]
      }
    }, createGame([], initialBoard))
}
