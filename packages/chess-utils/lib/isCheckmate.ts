import { Game, Color, isCheck, getLegalMoves } from '.'
import { getBoard } from './getBoard'
import { isLegalMove } from './isLegalMove'
import { whoseTurn } from './whoseTurn'

export const isCheckmate = (game: Game, color?: Color): boolean => {
  color = color ?? whoseTurn(game)
  const board = getBoard(game)

  if (!isCheck(game, color)) {
    return false
  }

  for (const [coords, piece] of board.entries()) {
    if (piece === null || piece.color !== color) {
      continue
    }

    if (getLegalMoves({ coords, piece }, game).some((move) => isLegalMove(move, game))) {
      return false
    }
  }

  return true
}
