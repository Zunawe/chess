import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getKingAttackedSpaces = (from: [Coordinates, Piece], moves: Move[], board: Board): Coordinates[] => {
  return getLegalMoves(from, moves, board).filter((move) => {
    return Math.abs(move.to[0].file - move.from[0].file) < 2
  }).map((move) => move.to[0])
}
