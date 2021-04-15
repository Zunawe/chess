import { isLegalBishopMove, isLegalRookMove } from './index'

export const isLegalQueenMove = (move: Move, board: Board): boolean => {
  return isLegalBishopMove(move, board) || isLegalRookMove(move, board)
}
