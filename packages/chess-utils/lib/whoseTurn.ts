import { Color, Move, Game } from '.'

export const whoseTurn = (arg: Move[] | Game): Color => {
  const moves = Array.isArray(arg) ? arg : arg.moves
  return moves.length % 2 === 0 ? 'L' : 'D'
}
