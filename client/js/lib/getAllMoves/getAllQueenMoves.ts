import { Coordinates } from '../util'
import { getAllRookMoves } from './getAllRookMoves'
import { getAllBishopMoves } from './getAllBishopMoves'

export const getAllQueenMoves = (from: [Coordinates, Piece]): Move[] => {
  return [...getAllRookMoves(from), ...getAllBishopMoves(from)]
}
