import { isLegalPawnMove } from './isLegalPawnMove'
import { isLegalKnightMove } from './isLegalKnightMove'
import { isLegalKingMove } from './isLegalKingMove'
import { isLegalRookMove } from './isLegalRookMove'
import { isLegalBishopMove } from './isLegalBishopMove'
import { isLegalQueenMove } from './isLegalQueenMove'

export * from './isLegalPawnMove'
export * from './isLegalKnightMove'
export * from './isLegalKingMove'
export * from './isLegalBishopMove'
export * from './isLegalRookMove'
export * from './isLegalQueenMove'

export const isLegalMove = (move: Move, moves: Move[], board: Board): boolean => {
  switch (move.from[1].type) {
    case 'P':
      return isLegalPawnMove(move, moves, board)
    case 'R':
      return isLegalRookMove(move, board)
    case 'N':
      return isLegalKnightMove(move, board)
    case 'B':
      return isLegalBishopMove(move, board)
    case 'Q':
      return isLegalQueenMove(move, board)
    case 'K':
      return isLegalKingMove(move, moves, board)
    default:
      throw new Error('Invalid piece type')
  }
}
