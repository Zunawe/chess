import { Coordinates } from '../util'

import { getLegalPawnMoves } from './getLegalPawnMoves'
import { getLegalKnightMoves } from './getLegalKnightMoves'
import { getLegalKingMoves } from './getLegalKingMoves'
import { getLegalRookMoves } from './getLegalRookMoves'
import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalQueenMoves } from './getLegalQueenMoves'

export * from './getLegalPawnMoves'
export * from './getLegalKnightMoves'
export * from './getLegalKingMoves'
export * from './getLegalBishopMoves'
export * from './getLegalRookMoves'
export * from './getLegalQueenMoves'

export const getLegalMoves = (from: [Coordinates, Piece], moves: Move[], board: Board): Move[] => {
  switch (from[1].type) {
    case 'P':
      return getLegalPawnMoves(from, moves, board)
    case 'R':
      return getLegalRookMoves(from, board)
    case 'N':
      return getLegalKnightMoves(from, board)
    case 'B':
      return getLegalBishopMoves(from, board)
    case 'Q':
      return getLegalQueenMoves(from, board)
    case 'K':
      return getLegalKingMoves(from, moves, board)
    default:
      throw new Error('Invalid piece type')
  }
}
