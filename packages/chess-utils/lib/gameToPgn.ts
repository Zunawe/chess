import { Game } from '.'
import { moveToPgn } from './moveToPgn'

export const gameToPgn = (game: Game): string => {
  const pgnMoves = game.moves
    .map((move, i) => moveToPgn(i, game))

  let pgn = ''
  for (let i = 0; i < pgnMoves.length; i += 2) {
    const lMove = pgnMoves[i]
    const dMove = pgnMoves[i + 1] ?? ''

    pgn += `${i + 1}. ${lMove} ${dMove}`
  }

  return pgn
}
