import { getAllKnightMoves } from '../getAllMoves'
import { movesEqual } from '../util'

export const isLegalKnightMove = (move: Move, board: Board): boolean => {
  const { from, to } = move
  const legalMoves = getAllKnightMoves(from).filter((move) => {
    const pieceAtDestination = board.get(to[0].toString())
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from[1].color
    }
  })

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}
