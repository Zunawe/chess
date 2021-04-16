import { getAllMoves } from '../getAllMoves'
import { Coordinates } from '../util'

export const getLegalKnightMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  const { board } = game

  const legalMoves = getAllMoves(from).filter((move) => {
    const pieceAtDestination = board[move.to[0].toString()]
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from[1].color
    }
  })

  return legalMoves
}
