import { Coordinates, Piece, Move, Game } from '../index'

import { getLegalPawnMoves } from './getLegalPawnMoves'
import { getLegalKnightMoves } from './getLegalKnightMoves'
import { getLegalKingMoves } from './getLegalKingMoves'
import { getLegalRookMoves } from './getLegalRookMoves'
import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalQueenMoves } from './getLegalQueenMoves'

export const getLegalMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  switch (from[1].type) {
    case 'P':
      return getLegalPawnMoves(from, game)
    case 'R':
      return getLegalRookMoves(from, game)
    case 'N':
      return getLegalKnightMoves(from, game)
    case 'B':
      return getLegalBishopMoves(from, game)
    case 'Q':
      return getLegalQueenMoves(from, game)
    case 'K':
      return getLegalKingMoves(from, game)
    default:
      throw new Error('Invalid piece type')
  }
}
