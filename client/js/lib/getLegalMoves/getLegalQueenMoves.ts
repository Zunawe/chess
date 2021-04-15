import { getLegalBishopMoves, getLegalRookMoves } from './index'
import { Coordinates } from '../util'

export const getLegalQueenMoves = (from: [Coordinates, Piece], board: Board): Move[] => {
  return [...getLegalBishopMoves(from, board), ...getLegalRookMoves(from, board)]
}
