import {
  movesEqual,
  getLegalMoves,
  Move,
  Game,
  whoseTurn
} from '.'

export const isLegalMove = (move: Move, game: Game): boolean => {
  const color = move.from.piece.color
  if (color !== whoseTurn(game)) {
    return false
  }

  return getLegalMoves(move.from, game)
    .some((legalMove) => movesEqual(legalMove, move))
}
