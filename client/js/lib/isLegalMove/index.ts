import { isLegalPawnMove } from './isLegalPawnMove'
import { isLegalKnightMove } from './isLegalKnightMove'

export * from './isLegalPawnMove'
export * from './isLegalKnightMove'

export const isLegalMove = (move: Move, moves: Move[], board: Piece[]): boolean => {
  switch (move.piece.type) {
    case 'P':
      return isLegalPawnMove(move, moves, board)
    case 'R':
    case 'N':
      return isLegalKnightMove(move, board)
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${move.piece.type}`)
  }
}
