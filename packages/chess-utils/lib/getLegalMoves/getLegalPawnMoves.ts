import { Coordinates, getAllMoves, Piece, Move, Game } from '../index'

export const getLegalPawnMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  const { board, moves } = game
  const isFirstMove = from[1].color === 'L' ? from[0].rank === 1 : from[0].rank === 6
  const direction = from[1].color === 'L' ? 1 : -1
  const legalMoves = getAllMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Double move on first turn
    if (Math.abs(to[0].rank - from[0].rank) === 2) {
      if (!isFirstMove) {
        return false
      }

      return board[(new Coordinates(from[0].file, from[0].rank + direction)).toString()] === undefined &&
        board[to[0].toString()] === undefined
    }

    // Capturing a piece diagonally
    if (to[0].file - from[0].file !== 0) {
      const pieceAtDestination = board[to[0].toString()]
      if (pieceAtDestination === undefined) {
        // Checking for en passant
        const prevMove = moves[moves.length - 1]
        if (prevMove !== undefined && prevMove.from[1].type === 'P' && prevMove.to[0].file === to[0].file) {
          if (Math.abs(prevMove.to[0].rank - prevMove.from[0].rank) === 2) {
            return true
          }
        }
        return false
      } else {
        // Checking for regular capture
        // If on the last rank
        if ((to[0].rank - 3.5) / 3.5 === direction) {
          // Must promote to queen, rook, bishop, or knight
          if (['Q', 'R', 'B', 'N'].includes(to[1].type)) {
            // If there is a capturable piece
            return pieceAtDestination.color !== from[1].color
          }
          return false
        } else {
          // Cannot promote if we're not on the last rank
          if (to[1].type !== 'P') {
            return false
          }
          // Piece must be capturable
          return pieceAtDestination.color !== from[1].color
        }
      }
    }

    // If on the last rank
    if ((to[0].rank - 3.5) / 3.5 === direction) {
      // Must promote to queen, rook, bishop, or knight
      if (['Q', 'R', 'B', 'N'].includes(to[1].type)) {
        // If the space is empty
        return board[to[0].toString()] === undefined
      }
      return false
    } else {
      // Cannot promote if we're not on the last rank
      if (to[1].type !== 'P') {
        return false
      }
      return board[to[0].toString()] === undefined
    }
  })

  return legalMoves
}
