import { Game, isCheck, getAllLegalMoves } from '.'

export const isCheckmate = (game: Game): boolean => {
  if (!isCheck(game)) {
    return false
  }

  return getAllLegalMoves(game).length === 0
}
