import { Move, getFile } from '.'

export const isCastle = (move: Move): boolean => {
  return move.from.piece.type === 'K' &&
    Math.abs(getFile(move.to.coords) - getFile(move.from.coords)) === 2
}
