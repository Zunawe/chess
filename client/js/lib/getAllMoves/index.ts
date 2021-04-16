import { Coordinates } from '../util'

import { getAllPawnMoves } from './getAllPawnMoves'
import { getAllKnightMoves } from './getAllKnightMoves'
import { getAllKingMoves } from './getAllKingMoves'
import { getAllRookMoves } from './getAllRookMoves'
import { getAllBishopMoves } from './getAllBishopMoves'
import { getAllQueenMoves } from './getAllQueenMoves'

export const getAllMoves = (from: [Coordinates, Piece]): Move[] => {
  switch (from[1].type) {
    case 'P':
      return getAllPawnMoves(from)
    case 'R':
      return getAllRookMoves(from)
    case 'N':
      return getAllKnightMoves(from)
    case 'B':
      return getAllBishopMoves(from)
    case 'Q':
      return getAllQueenMoves(from)
    case 'K':
      return getAllKingMoves(from)
    default:
      throw new Error('Invalid piece type')
  }
}
