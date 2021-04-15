import { isLegalPawnMove } from './isLegalPawnMove'
import { isLegalKnightMove } from './isLegalKnightMove'
import { isLegalKingMove } from './isLegalKingMove'

export * from './isLegalPawnMove'
export * from './isLegalKnightMove'
export * from './isLegalKingMove'

export const isLegalMove = (move: Move, moves: Move[], board: Board): boolean => {
  switch (move.from[1].type) {
    case 'P':
      return isLegalPawnMove(move, moves, board)
    case 'R':
    case 'N':
      return isLegalKnightMove(move, board)
    case 'B':
    case 'Q':
    case 'K':
      return isLegalKingMove(move, moves, board)
    default:
      throw new Error('Invalid piece type')
  }
}
