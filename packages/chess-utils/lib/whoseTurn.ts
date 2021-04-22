import { Color, Game } from '.'

export const whoseTurn = (game: Game): Color => {
  return game.moves.length % 2 === 0 ? 'W' : 'B'
}
