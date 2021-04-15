export const piecesEqual = (a: Piece, b: Piece): boolean => {
  return a.color === b.color &&
    a.type === b.type &&
    coordinatesEqual(a.coordinates, b.coordinates)
}

export const coordinatesEqual = (a: Coordinates, b: Coordinates): boolean => {
  return a.rank === b.rank &&
    a.file === b.file
}

export const movesEqual = (a: Move, b: Move): boolean => {
  return piecesEqual(a.piece, b.piece) && coordinatesEqual(a.to, b.to)
}

export const getPieceAtCoordinates = (coordinates: Coordinates, board: Piece[]): Piece | null => {
  return board.find((piece) => {
    return coordinatesEqual(piece.coordinates, coordinates)
  }) ?? null
}

export const createPiece = (type: PieceType, color: Color, rank: number, file: number): Piece => {
  return {
    type,
    color,
    coordinates: { rank, file }
  }
}

export const getStartingBoard = (): Piece[] => {
  return JSON.parse(JSON.stringify(STARTING_BOARD))
}

export const applyMoves = (moves: Move[], board: Piece[]): void => {
  moves.forEach((move) => {
    applyMove(move, board)
  })
}

export const applyMove = (move: Move, board: Piece[]) => {
  const piece = board.find((piece) => piecesEqual(piece, move.piece))

  if (piece === undefined) {
    throw new Error(`Invalid move: ${move}`)
  }

  // Castle
  if (piece.type === 'K' && Math.abs(move.to.file - piece.coordinates.file) === 2) {
    const rooks = board.filter(({ type, color }) => color === piece.color && type === 'R')
    const rook = move.to.file - piece.coordinates.file === -2 ?
      rooks.find(({ coordinates }) => coordinates.file === 0) :
      rooks.find(({ coordinates }) => coordinates.file === 7)

    if (rook === undefined) {
      throw new Error(`Couldn't find rook to castle with: ${move}`)
    }

    rook.coordinates.file = move.to.file + (((move.to.file - piece.coordinates.file) / 2) * -1)
  }

  piece.coordinates = move.to
}

export const STARTING_BOARD: Piece[] = [
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 0 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 1 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 2 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 3 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 4 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 5 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 6 } },
  { color: 'L', type: 'P', coordinates: { rank: 1, file: 7 } },
  { color: 'L', type: 'R', coordinates: { rank: 0, file: 0 } },
  { color: 'L', type: 'N', coordinates: { rank: 0, file: 1 } },
  { color: 'L', type: 'B', coordinates: { rank: 0, file: 2 } },
  { color: 'L', type: 'Q', coordinates: { rank: 0, file: 3 } },
  { color: 'L', type: 'K', coordinates: { rank: 0, file: 4 } },
  { color: 'L', type: 'B', coordinates: { rank: 0, file: 5 } },
  { color: 'L', type: 'N', coordinates: { rank: 0, file: 6 } },
  { color: 'L', type: 'R', coordinates: { rank: 0, file: 7 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 0 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 1 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 2 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 3 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 4 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 5 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 6 } },
  { color: 'D', type: 'P', coordinates: { rank: 6, file: 7 } },
  { color: 'D', type: 'R', coordinates: { rank: 7, file: 0 } },
  { color: 'D', type: 'N', coordinates: { rank: 7, file: 1 } },
  { color: 'D', type: 'B', coordinates: { rank: 7, file: 2 } },
  { color: 'D', type: 'Q', coordinates: { rank: 7, file: 3 } },
  { color: 'D', type: 'K', coordinates: { rank: 7, file: 4 } },
  { color: 'D', type: 'B', coordinates: { rank: 7, file: 5 } },
  { color: 'D', type: 'N', coordinates: { rank: 7, file: 6 } },
  { color: 'D', type: 'R', coordinates: { rank: 7, file: 7 } }
]
