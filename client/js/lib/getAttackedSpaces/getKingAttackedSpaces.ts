import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getKingAttackedSpaces = (from: [Coordinates, Piece], game: Game): Coordinates[] => {
  return getLegalMoves(from, game).filter((move) => {
    return Math.abs(move.to[0].file - move.from[0].file) < 2
  }).map((move) => move.to[0])
}
