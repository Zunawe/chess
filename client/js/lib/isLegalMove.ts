import { movesEqual, piecesEqual, coordinatesEqual, getPieceAtCoordinates } from './util'

export const isLegalMove = (move: Move, moves: Move[], board: Piece[]): boolean => {
  switch (move.piece.type) {
    case 'P':
      return isLegalPawnMove(move, moves, board)
    case 'R':
    case 'K':
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${move.piece.type}`)
  }
}

const isLegalPawnMove = (move: Move, moves: Move[], board: Piece[]): boolean => {
  const { piece } = move
  const isFirstMove = piece.color === 'L' ? piece.coordinates.rank === 1 : piece.coordinates.rank === 6
  const direction = piece.color === 'L' ? 1 : -1
  const legalMoves = getAllMoves(piece).filter((move) => {
    if (Math.abs(move.to.rank - piece.coordinates.rank) === 2) {
      if (!isFirstMove) {
        return false
      }

      return getPieceAtCoordinates({
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file
      }, board) === null && getPieceAtCoordinates(move.to, board) === null
    }

    if (move.to.file - piece.coordinates.file !== 0) {
      const pieceAtDestination = getPieceAtCoordinates(move.to, board)
      if (pieceAtDestination === null) {
        const prevMove = moves[moves.length - 1]
        if (prevMove !== undefined && prevMove.piece.type === 'P' && prevMove.to.file === move.to.file) {
          if (Math.abs(prevMove.to.rank - prevMove.piece.coordinates.rank) === 2) {
            return true
          }
        }
        return false
      } else {
        return pieceAtDestination.color !== piece.color
      }
    }

    return getPieceAtCoordinates(move.to, board) === null
  })

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}

const getAllMoves = (piece: Piece): Move[] => {
  switch (piece.type) {
    case 'P':
      return getAllPawnMoves(piece)
    case 'R':
    case 'K':
    case 'B':
    case 'Q':
    case 'K':
    default:
      throw new Error(`Invalid piece type: ${piece.type}`)
  }
}

const getAllPawnMoves = (piece: Piece): Move[] => {
  const direction = piece.color === 'L' ? 1 : -1
  const possibleMoves = [
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + (direction * 2),
        file: piece.coordinates.file
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file + 1
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file - 1
      }
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to.file <= 7 && move.to.file >= 0 && move.to.rank <= 7 && move.to.rank >= 0
  })
}
