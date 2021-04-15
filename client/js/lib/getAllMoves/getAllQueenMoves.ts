import { Coordinates } from '../util'
import { getAllRookMoves, getAllBishopMoves } from './index'

export const getAllQueenMoves = (from: [Coordinates, Piece]): Move[] => {
  return [...getAllRookMoves(from), ...getAllBishopMoves(from)]
}
