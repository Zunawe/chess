import { Coordinates } from '../index'

import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalRookMoves } from './getLegalRookMoves'

export const getLegalQueenMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  return [...getLegalBishopMoves(from, game), ...getLegalRookMoves(from, game)]
}
