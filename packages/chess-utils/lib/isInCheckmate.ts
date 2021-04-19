import { Coordinates, Color, Game, isInCheck, getLegalMoves } from '.'
import { getBoard } from './getBoard'

export const isInCheckmate = (color: Color, game: Game): boolean => {
  const board = getBoard(game)

  if (!isInCheck(color, game)) {
    return false
  }

  const friendlyPieces = Object.entries(board).filter(([, p]) => p.color === color)
  const legalMoves = friendlyPieces.map(([c, p]) => getLegalMoves({ coordinates: new Coordinates(c), piece: p }, game))
  return legalMoves.length === 0
}
