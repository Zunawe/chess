import { MovePart, Move } from '../index'

import { getAllPawnMoves } from './getAllPawnMoves'
import { getAllKnightMoves } from './getAllKnightMoves'
import { getAllKingMoves } from './getAllKingMoves'
import { getAllRookMoves } from './getAllRookMoves'
import { getAllBishopMoves } from './getAllBishopMoves'
import { getAllQueenMoves } from './getAllQueenMoves'

export const getAllMoves = (from: MovePart): Move[] => {
  switch (from.piece.type) {
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
