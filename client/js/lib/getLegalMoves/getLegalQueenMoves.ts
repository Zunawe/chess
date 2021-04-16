import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalRookMoves } from './getLegalRookMoves'
import { Coordinates } from '../util'

export const getLegalQueenMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  return [...getLegalBishopMoves(from, game), ...getLegalRookMoves(from, game)]
}
