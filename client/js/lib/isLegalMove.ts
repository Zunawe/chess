import { getLegalMoves } from './getLegalMoves'
import { isInCheck } from './isInCheck'
import { applyMove, movesEqual } from './util'

export const isLegalMove = (move: Move, moves: Move[], board: Board): boolean => {
  return getLegalMoves(move.from, moves, board)
    .filter((legalMove) => !isInCheck(move.from[1].color, moves, applyMove(legalMove, board)))
    .some((legalMove) => movesEqual(legalMove, move))
}
