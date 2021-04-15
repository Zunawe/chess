import { getAllKingMoves } from '../getAllMoves'
import { Coordinates, coordinatesEqual, movesEqual, piecesEqual } from '../util'

export const isLegalKingMove = (move: Move, moves: Move[], board: Board): boolean => {
  const legalMoves = getAllKingMoves(move.from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Castling
    if (Math.abs(to[0].file - from[0].file) > 1) {
      const rank = from[1].color === 'L' ? 0 : 7

      // King must be in original position
      if (from[0].rank !== rank || from[0].file !== 4) {
        return false
      }

      const direction = (to[0].file - from[0].file) / 2

      // All spaces between king and rook must not be occupied
      for (let f = 4 + direction; f !== 0 && f !== 7; f += direction) {
        if (board[(new Coordinates(f, rank)).toString()] !== undefined) {
          return false
        }
      }

      // Rook of the same color must be in the corresponding corner
      const rook = board[(new Coordinates(direction < 0 ? 0 : 7, rank)).toString()]
      if (rook === undefined || rook.color !== from[1].color) {
        return false
      }

      // King and rook must have never moved
      for (let i = 0; i < moves.length; ++i) {
        // King moved
        if (piecesEqual(moves[i].from[1], from[1])) {
          return false
        }
        // Rook moved
        if (piecesEqual(moves[i].from[1], rook) && coordinatesEqual(moves[i].from[0], new Coordinates(direction < 0 ? 0 : 7, rank))) {
          return false
        }
      }

      return true
    }

    const pieceAtDestination = board[to[0].toString()]
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from[1].color
    }
  })

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}
