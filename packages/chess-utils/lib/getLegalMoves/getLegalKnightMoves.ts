import { getAllMoves, MovePart, Move, Game, getBoard } from '../index'

export const getLegalKnightMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  const legalMoves = getAllMoves(from).filter((move) => {
    const pieceAtDestination = board[move.to.coordinates.toString()]
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from.piece.color
    }
  })

  return legalMoves
}
