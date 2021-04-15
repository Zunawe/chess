import { getAllPawnMoves } from './getAllPawnMoves'
import { getAllKnightMoves } from './getAllKnightMoves'

export * from './getAllPawnMoves'
export * from './getAllKnightMoves'

export const getAllMoves = (piece: Piece): Move[] => {
  switch (piece.type) {
    case 'P':
      return getAllPawnMoves(piece)
    case 'R':
    case 'N':
      return getAllKnightMoves(piece)
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${piece.type}`)
  }
}
