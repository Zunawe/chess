import { Move } from './index'

export const isCastle = (move: Move): boolean => {
  return move.from.piece.type === 'K' &&
    Math.abs(move.to.coordinates.file - move.from.coordinates.file) === 2
}
