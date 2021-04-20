import { getBoard } from './getBoard'
import { getAttackedSpaces, flipColor, whoseTurn, Game } from '.'

export const isCheck = (game: Game): boolean => {
  const color = whoseTurn(game)
  const board = getBoard(game)

  const kingCoords = board.findIndex((piece) => piece !== null && piece.type === 'K' && piece.color === color)

  for (const [coords, piece] of board.entries()) {
    if (piece === null || piece.color !== flipColor(color)) {
      continue
    }

    if (getAttackedSpaces({ coords, piece }, game).includes(kingCoords)) {
      return true
    }
  }
  return false
}
