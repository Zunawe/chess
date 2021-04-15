import { getAllKnightMoves } from '../getAllMoves'
import { getPieceAtCoordinates, movesEqual } from '../util'

export const isLegalKnightMove = (move: Move, board: Piece[]): boolean => {
  const { piece } = move
  const legalMoves = getAllKnightMoves(piece).filter((move) => {
    const pieceAtDestination = getPieceAtCoordinates(move.to, board)
    if (pieceAtDestination === null) {
      return true
    } else {
      return pieceAtDestination.color !== piece.color
    }
  })

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}
