import { Game, Move } from '.'
import { encodeMove } from './encodeMove'

export const encodeGame = (arg: Game | Move[]): string => {
  const moves = Array.isArray(arg) ? arg : arg.moves

  return moves.reduce((acc, move, i) => acc + encodeMove(i, moves) + (i === moves.length - 1 ? '' : ' '), '')
}
