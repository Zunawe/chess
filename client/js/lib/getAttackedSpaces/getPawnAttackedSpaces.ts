import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getPawnAttackedSpaces = (from: [Coordinates, Piece], game: Game): Coordinates[] => {
  return getLegalMoves(from, game).filter((move) => {
    return move.to[0].file !== move.from[0].file
  }).map((move) => move.to[0])
}
