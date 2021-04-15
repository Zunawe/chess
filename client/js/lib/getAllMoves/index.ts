import { Coordinates } from '../util'

import { getAllPawnMoves } from './getAllPawnMoves'
import { getAllKnightMoves } from './getAllKnightMoves'
import { getAllKingMoves } from './getAllKingMoves'

export * from './getAllPawnMoves'
export * from './getAllKnightMoves'
export * from './getAllKingMoves'

export const getAllMoves = (from: [Coordinates, Piece]): Move[] => {
  switch (from[1].type) {
    case 'P':
      return getAllPawnMoves(from)
    case 'R':
    case 'N':
      return getAllKnightMoves(from)
    case 'B':
    case 'Q':
    case 'K':
      return getAllKingMoves(from)
    default:
      throw new Error('Invalid piece type')
  }
}
