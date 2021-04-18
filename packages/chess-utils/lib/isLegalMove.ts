import {
  applyMove,
  movesEqual,
  isCastle,
  Coordinates,
  isInCheck,
  getLegalMoves,
  Move,
  Game,
  whoseTurn
} from './index'

export const isLegalMove = (move: Move, game: Game): boolean => {
  const color = move.from[1].color
  if (color !== whoseTurn(game)) {
    return false
  }

  return getLegalMoves(move.from, game)
    // Move can't leave king in check
    .filter((legalMove) => !isInCheck(color, applyMove(legalMove, game)))
    .filter((legalMove) => {
      if (isCastle(move)) {
        // King can't castle while in check
        if (isInCheck(color, game)) {
          return false
        }

        // King can't cross a space that would put him in check during castle
        const direction = (legalMove.to[0].file - legalMove.from[0].file) / 2
        const testMove: Move = {
          from: legalMove.from,
          to: [new Coordinates(legalMove.from[0].file + direction, legalMove.to[0].rank), legalMove.to[1]]
        }
        return !isInCheck(color, applyMove(testMove, game))
      }

      return true
    })
    .some((legalMove) => movesEqual(legalMove, move))
}
