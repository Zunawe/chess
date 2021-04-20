import { getAllMoves, MovePart, Move, Game, getBoard, getRank, getFile } from '..'
import { toCoords } from '../coordinates'

export const getLegalPawnMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  const isFirstMove = from.piece.color === 'L' ? getRank(from.coords) === 1 : getRank(from.coords) === 6
  const direction = from.piece.color === 'L' ? 1 : -1
  const legalMoves = getAllMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Double move on first turn
    if (Math.abs(getRank(to.coords) - getRank(from.coords)) === 2) {
      if (!isFirstMove) {
        return false
      }

      return board[toCoords(getFile(from.coords), getRank(from.coords) + direction)] === null &&
        board[to.coords] === null
    }

    // Capturing a piece diagonally
    if (getFile(to.coords) - getFile(from.coords) !== 0) {
      const pieceAtDestination = board[to.coords]
      if (pieceAtDestination === null) {
        // Checking for en passant
        const prevMove = game.moves[game.moves.length - 1]
        if (prevMove !== undefined && prevMove.from.piece.type === 'P' && getFile(prevMove.to.coords) === getFile(to.coords)) {
          if (Math.abs(getRank(prevMove.to.coords) - getRank(prevMove.from.coords)) === 2) {
            return true
          }
        }
        return false
      } else {
        // Checking for regular capture
        // If on the last rank
        if ((getRank(to.coords) - 3.5) / 3.5 === direction) {
          // Must promote to queen, rook, bishop, or knight
          if (['Q', 'R', 'B', 'N'].includes(to.piece.type)) {
            // If there is a capturable piece
            return pieceAtDestination.color !== from.piece.color
          }
          return false
        } else {
          // Cannot promote if we're not on the last rank
          if (to.piece.type !== 'P') {
            return false
          }
          // Piece must be capturable
          return pieceAtDestination.color !== from.piece.color
        }
      }
    }

    // If on the last rank
    if ((getRank(to.coords) - 3.5) / 3.5 === direction) {
      // Must promote to queen, rook, bishop, or knight
      if (['Q', 'R', 'B', 'N'].includes(to.piece.type)) {
        // If the space is empty
        return board[to.coords] === null
      }
      return false
    } else {
      // Cannot promote if we're not on the last rank
      if (to.piece.type !== 'P') {
        return false
      }
      return board[to.coords] === null
    }
  })

  return legalMoves
}
