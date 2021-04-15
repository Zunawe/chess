import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getQueenAttackedSpaces = (from: [Coordinates, Piece], moves: Move[], board: Board): Coordinates[] => {
  return getLegalMoves(from, moves, board).map((move) => move.to[0])
}
