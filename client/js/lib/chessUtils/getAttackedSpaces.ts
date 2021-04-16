import { Coordinates, getLegalMoves } from './index'

export const getAttackedSpaces = (from: [Coordinates, Piece], game: Game): Coordinates[] => {
  switch (from[1].type) {
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
      return getLegalMoves(from, game).map((move) => move.to[0])
    case 'P':
      return getLegalMoves(from, game).filter((move) => {
        return move.to[0].file !== move.from[0].file
      }).map((move) => move.to[0])
    case 'K':
      return getLegalMoves(from, game).filter((move) => {
        return Math.abs(move.to[0].file - move.from[0].file) < 2
      }).map((move) => move.to[0])
    default:
      throw new Error('Invalid piece type')
  }
}
