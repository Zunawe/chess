import { isLegalPawnMove } from './isLegalPawnMove'

export * from './isLegalPawnMove'

export const isLegalMove = (move: Move, moves: Move[], board: Piece[]): boolean => {
  switch (move.piece.type) {
    case 'P':
      return isLegalPawnMove(move, moves, board)
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${move.piece.type}`)
  }
}
