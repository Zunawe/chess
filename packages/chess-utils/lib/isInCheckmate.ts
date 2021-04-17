import { Coordinates, Color, Game, isInCheck, getLegalMoves } from '.'

export const isInCheckmate = (color: Color, game: Game): boolean => {
  if (!isInCheck(color, game)) {
    return false
  }

  const friendlyPieces = Object.entries(game.board).filter(([, p]) => p.color === color)
  const legalMoves = friendlyPieces.map(([c, p]) => getLegalMoves([new Coordinates(c), p], game))
  return legalMoves.length === 0
}
