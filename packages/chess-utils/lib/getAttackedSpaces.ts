import { Coordinates, getLegalMoves, MovePart, Game } from './index'

export const getAttackedSpaces = (from: MovePart, game: Game): Coordinates[] => {
  switch (from.piece.type) {
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
      return getLegalMoves(from, game).map((move) => move.to.coordinates)
    case 'P':
      return getLegalMoves(from, game).filter((move) => {
        return move.to.coordinates.file !== move.from.coordinates.file
      }).map((move) => move.to.coordinates)
    case 'K':
      return getLegalMoves(from, game).filter((move) => {
        return Math.abs(move.to.coordinates.file - move.from.coordinates.file) < 2
      }).map((move) => move.to.coordinates)
    default:
      throw new Error('Invalid piece type')
  }
}
