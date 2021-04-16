import { getLegalBishopMoves, getLegalRookMoves } from './index'
import { Coordinates } from '../util'

export const getLegalQueenMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  return [...getLegalBishopMoves(from, game), ...getLegalRookMoves(from, game)]
}
