import { Game, isCheck, getLegalMoves } from '.'
import { getBoard } from './getBoard'
import { whoseTurn } from './whoseTurn'

export const isCheckmate = (game: Game): boolean => {
  const color = whoseTurn(game)
  const board = getBoard(game)

  if (!isCheck(game)) {
    return false
  }

  for (const [coords, piece] of board.entries()) {
    if (piece === null || piece.color !== color) {
      continue
    }

    if (getLegalMoves({ coords, piece }, game).length > 0) {
      return false
    }
  }

  return true
}
