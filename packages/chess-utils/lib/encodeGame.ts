import { Game } from '.'
import { encodeMove } from './encodeMove'

export const encodeGame = (game: Game): string => {
  return game.moves.reduce((acc, move, i) => acc + encodeMove(i, game) + (i === game.moves.length - 1 ? '' : ' '), '')
}
