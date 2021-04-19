import { Coordinates, getAllMoves, MovePart, Move, Game, getBoard } from '../index'

export const getLegalPawnMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  const isFirstMove = from.piece.color === 'L' ? from.coordinates.rank === 1 : from.coordinates.rank === 6
  const direction = from.piece.color === 'L' ? 1 : -1
  const legalMoves = getAllMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Double move on first turn
    if (Math.abs(to.coordinates.rank - from.coordinates.rank) === 2) {
      if (!isFirstMove) {
        return false
      }

      return board[(new Coordinates(from.coordinates.file, from.coordinates.rank + direction)).toString()] === undefined &&
        board[to.coordinates.toString()] === undefined
    }

    // Capturing a piece diagonally
    if (to.coordinates.file - from.coordinates.file !== 0) {
      const pieceAtDestination = board[to.coordinates.toString()]
      if (pieceAtDestination === undefined) {
        // Checking for en passant
        const prevMove = game.moves[game.moves.length - 1]
        if (prevMove !== undefined && prevMove.from.piece.type === 'P' && prevMove.to.coordinates.file === to.coordinates.file) {
          if (Math.abs(prevMove.to.coordinates.rank - prevMove.from.coordinates.rank) === 2) {
            return true
          }
        }
        return false
      } else {
        // Checking for regular capture
        // If on the last rank
        if ((to.coordinates.rank - 3.5) / 3.5 === direction) {
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
    if ((to.coordinates.rank - 3.5) / 3.5 === direction) {
      // Must promote to queen, rook, bishop, or knight
      if (['Q', 'R', 'B', 'N'].includes(to.piece.type)) {
        // If the space is empty
        return board[to.coordinates.toString()] === undefined
      }
      return false
    } else {
      // Cannot promote if we're not on the last rank
      if (to.piece.type !== 'P') {
        return false
      }
      return board[to.coordinates.toString()] === undefined
    }
  })

  return legalMoves
}
