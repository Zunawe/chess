import { getAllKnightMoves } from '../getAllMoves'
import { Coordinates } from '../util'

export const getLegalKnightMoves = (from: [Coordinates, Piece], board: Board): Move[] => {
  const legalMoves = getAllKnightMoves(from).filter((move) => {
    const pieceAtDestination = board[move.to[0].toString()]
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from[1].color
    }
  })

  return legalMoves
}
