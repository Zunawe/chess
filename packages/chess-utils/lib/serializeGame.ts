import { Game } from '.'
import { serializeMove } from './serializeMove'

export const serializeGame = (game: Game): string => {
  return game.moves.reduce((acc, move) => acc + ':' + serializeMove(move), '').substring(1)
}
