import { getLegalMoves, MovePart, Game, getFile } from './index'
import { isCastle } from './isCastle'

export const getAttackedSpaces = (from: MovePart, game: Game): number[] => {
  switch (from.piece.type) {
    case 'R':
    case 'N':
    case 'B':
    case 'Q':
      return getLegalMoves(from, game).map((move) => move.to.coords)
    case 'P':
      return getLegalMoves(from, game).filter((move) => {
        return getFile(move.to.coords) !== getFile(move.from.coords)
      }).map((move) => move.to.coords)
    case 'K':
      return getLegalMoves(from, game).filter((move) => !isCastle(move)).map((move) => move.to.coords)
    default:
      throw new Error('Invalid piece type')
  }
}
