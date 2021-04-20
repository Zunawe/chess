import { toCoords } from '../coordinates'
import { getAllMoves, isCastle, piecesEqual, MovePart, Move, Game, getBoard, getFile, getRank } from '../index'

export const getLegalKingMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  const legalMoves = getAllMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Castling
    if (isCastle(possibleMove)) {
      const rank = from.piece.color === 'L' ? 0 : 7

      // King must be in original position
      if (getRank(from.coords) !== rank || getFile(from.coords) !== 4) {
        return false
      }

      const direction = (getFile(to.coords) - getFile(from.coords)) / 2

      // All spaces between king and rook must not be occupied
      for (let f = 4 + direction; f !== 0 && f !== 7; f += direction) {
        if (board[toCoords(f, rank)] !== null) {
          return false
        }
      }

      // Rook of the same color must be in the corresponding corner
      const rook = board[toCoords(direction < 0 ? 0 : 7, rank)]
      if (rook === null || rook.color !== from.piece.color) {
        return false
      }

      // King and rook must have never moved
      for (let i = 0; i < game.moves.length; ++i) {
        // King moved
        if (piecesEqual(game.moves[i].from.piece, from.piece)) {
          return false
        }
        // Rook moved
        if (piecesEqual(game.moves[i].from.piece, rook) && game.moves[i].from.coords === toCoords(direction < 0 ? 0 : 7, rank)) {
          return false
        }
      }

      return true
    }

    const pieceAtDestination = board[to.coords]
    if (pieceAtDestination === null) {
      return true
    } else {
      return pieceAtDestination.color !== from.piece.color
    }
  })

  return legalMoves
}
