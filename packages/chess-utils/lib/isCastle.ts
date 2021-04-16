import { Move } from './index'

export const isCastle = (move: Move): boolean => {
  return move.from[1].type === 'K' &&
    Math.abs(move.to[0].file - move.from[0].file) === 2
}
