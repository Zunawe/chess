import { getAllPawnMoves } from './getAllPawnMoves'

export * from './getAllPawnMoves'

export const getAllMoves = (piece: Piece): Move[] => {
  switch (piece.type) {
    case 'P':
      return getAllPawnMoves(piece)
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${piece.type}`)
  }
}
