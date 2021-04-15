export class Coordinates {
  file: number
  rank: number

  constructor (file: number, rank: number)
  constructor (name: string)

  constructor (...args: any[]) {
    if (args.length === 1) {
      const name: string = args[0]
      this.file = name.charCodeAt(0) - 97
      this.rank = Number.parseInt(name[1]) - 1
    } else if (args.length === 2) {
      this.file = args[0]
      this.rank = args[1]
    } else {
      throw new Error('Wrong number of arguments to Coordinate constructor')
    }
  }

  toString (): string {
    return `${String.fromCharCode(this.file + 97)}${this.rank + 1}`
  }
}

export const piecesEqual = (a: Piece, b: Piece): boolean => {
  return a.color === b.color &&
    a.type === b.type
}

export const coordinatesEqual = (a: Coordinates, b: Coordinates): boolean => {
  return a.rank === b.rank &&
    a.file === b.file
}

export const movesEqual = (a: Move, b: Move): boolean => {
  return coordinatesEqual(a.from[0], b.from[0]) &&
    coordinatesEqual(a.to[0], b.to[0]) &&
    piecesEqual(a.from[1], b.from[1]) &&
    piecesEqual(a.to[1], b.to[1])
}

export const createPiece = (type: PieceType, color: Color): Piece => ({ type, color })

export const getStartingBoard = (): Board => {
  const data: Array<[Coordinates, Piece]> = [
    [new Coordinates(0, 1), createPiece('P', 'L')],
    [new Coordinates(1, 1), createPiece('P', 'L')],
    [new Coordinates(2, 1), createPiece('P', 'L')],
    [new Coordinates(3, 1), createPiece('P', 'L')],
    [new Coordinates(4, 1), createPiece('P', 'L')],
    [new Coordinates(5, 1), createPiece('P', 'L')],
    [new Coordinates(6, 1), createPiece('P', 'L')],
    [new Coordinates(7, 1), createPiece('P', 'L')],
    [new Coordinates(0, 0), createPiece('R', 'L')],
    [new Coordinates(1, 0), createPiece('N', 'L')],
    [new Coordinates(2, 0), createPiece('B', 'L')],
    [new Coordinates(3, 0), createPiece('Q', 'L')],
    [new Coordinates(4, 0), createPiece('K', 'L')],
    [new Coordinates(5, 0), createPiece('B', 'L')],
    [new Coordinates(6, 0), createPiece('N', 'L')],
    [new Coordinates(7, 0), createPiece('R', 'L')],
    [new Coordinates(0, 6), createPiece('P', 'D')],
    [new Coordinates(1, 6), createPiece('P', 'D')],
    [new Coordinates(2, 6), createPiece('P', 'D')],
    [new Coordinates(3, 6), createPiece('P', 'D')],
    [new Coordinates(4, 6), createPiece('P', 'D')],
    [new Coordinates(5, 6), createPiece('P', 'D')],
    [new Coordinates(6, 6), createPiece('P', 'D')],
    [new Coordinates(7, 6), createPiece('P', 'D')],
    [new Coordinates(0, 7), createPiece('R', 'D')],
    [new Coordinates(1, 7), createPiece('N', 'D')],
    [new Coordinates(2, 7), createPiece('B', 'D')],
    [new Coordinates(3, 7), createPiece('Q', 'D')],
    [new Coordinates(4, 7), createPiece('K', 'D')],
    [new Coordinates(5, 7), createPiece('B', 'D')],
    [new Coordinates(6, 7), createPiece('N', 'D')],
    [new Coordinates(7, 7), createPiece('R', 'D')]
  ]

  return data.reduce<Board>((board, [coordinates, piece]) => {
    board.set(coordinates.toString(), piece)
    return board
  }, new Map())
}

export const applyMoves = (moves: Move[], board: Board): void => {
  moves.forEach((move) => {
    applyMove(move, board)
  })
}

export const applyMove = (move: Move, board: Board): void => {
  const piece = board.get(move.from[0].toString())

  if (piece === undefined) {
    throw new Error('Invalid move')
  }

  // Castle
  if (piece.type === 'K' && Math.abs(move.to[0].file - move.from[0].file) === 2) {
    const rookCoords = move.to[0].file - move.from[0].file < 0
      ? (move.from[1].color === 'L' ? new Coordinates('a1') : new Coordinates('a8'))
      : (move.from[1].color === 'L' ? new Coordinates('h1') : new Coordinates('h8'))

    const rook = board.get(rookCoords.toString())
    if (rook === undefined || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    applyMove({
      from: [rookCoords, rook],
      to: [new Coordinates(move.to[0].file + (move.to[0].file - move.from[0].file / (-2)), move.from[0].rank), rook]
    }, board)
  }

  board.delete(move.from[0].toString())
  board.set(move.to[0].toString(), move.to[1])
}
