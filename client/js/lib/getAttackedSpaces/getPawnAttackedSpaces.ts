import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getPawnAttackedSpaces = (from: [Coordinates, Piece], moves: Move[], board: Board): Coordinates[] => {
  return getLegalMoves(from, moves, board).filter((move) => {
    return move.to[0].file !== move.from[0].file
  }).map((move) => move.to[0])
}
