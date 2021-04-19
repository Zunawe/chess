import { MovePart, Move } from '../index'

import { getAllRookMoves } from './getAllRookMoves'
import { getAllBishopMoves } from './getAllBishopMoves'

export const getAllQueenMoves = (from: MovePart): Move[] => {
  return [...getAllRookMoves(from), ...getAllBishopMoves(from)]
}
