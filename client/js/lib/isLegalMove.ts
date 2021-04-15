import { getLegalMoves } from './getLegalMoves'
import { isInCheck } from './isInCheck'
import { applyMove, movesEqual, isCastle, Coordinates } from './util'

export const isLegalMove = (move: Move, moves: Move[], board: Board): boolean => {
  return getLegalMoves(move.from, moves, board)
    .filter((legalMove) => !isInCheck(move.from[1].color, moves, applyMove(legalMove, board)))
    .filter((legalMove) => {
      if (isCastle(move)) {
        const direction = (legalMove.to[0].file - legalMove.from[0].file) / 2
        const testMove: Move = {
          from: legalMove.from,
          to: [new Coordinates(legalMove.from[0].file + direction, legalMove.to[0].rank), legalMove.to[1]]
        }

        return !isInCheck(move.from[1].color, moves, applyMove(testMove, board))
      }

      return true
    })
    .some((legalMove) => movesEqual(legalMove, move))
}
