import { Coordinates } from '../util'
import { getLegalMoves } from '../getLegalMoves'

export const getKnightAttackedSpaces = (from: [Coordinates, Piece], game: Game): Coordinates[] => {
  return getLegalMoves(from, game).map((move) => move.to[0])
}
