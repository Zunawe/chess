import { Coordinates, getAllMoves, coordinatesEqual, isCastle, piecesEqual, MovePart, Move, Game, getBoard } from '../index'

export const getLegalKingMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  const legalMoves = getAllMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Castling
    if (isCastle(possibleMove)) {
      const rank = from.piece.color === 'L' ? 0 : 7

      // King must be in original position
      if (from.coordinates.rank !== rank || from.coordinates.file !== 4) {
        return false
      }

      const direction = (to.coordinates.file - from.coordinates.file) / 2

      // All spaces between king and rook must not be occupied
      for (let f = 4 + direction; f !== 0 && f !== 7; f += direction) {
        if (board[(new Coordinates(f, rank)).toString()] !== undefined) {
          return false
        }
      }

      // Rook of the same color must be in the corresponding corner
      const rook = board[(new Coordinates(direction < 0 ? 0 : 7, rank)).toString()]
      if (rook === undefined || rook.color !== from.piece.color) {
        return false
      }

      // King and rook must have never moved
      for (let i = 0; i < game.moves.length; ++i) {
        // King moved
        if (piecesEqual(game.moves[i].from.piece, from.piece)) {
          return false
        }
        // Rook moved
        if (piecesEqual(game.moves[i].from.piece, rook) && coordinatesEqual(game.moves[i].from.coordinates, new Coordinates(direction < 0 ? 0 : 7, rank))) {
          return false
        }
      }

      return true
    }

    const pieceAtDestination = board[to.coordinates.toString()]
    if (pieceAtDestination === undefined) {
      return true
    } else {
      return pieceAtDestination.color !== from.piece.color
    }
  })

  return legalMoves
}
