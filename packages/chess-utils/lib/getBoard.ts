import { toCoords, encodeCoords, decodeCoords, getFile, getRank, isCastle, Move, Board, Game, Piece, createPiece } from '.'

export const getBoard = (game: Game): Board => {
  return game.moves.reduce((acc, move) => {
    return applyMove(move, acc)
  }, game.initialBoard)
}

export const getStartingBoard = (): Board => {
  const data: Array<[number, Piece]> = [
    [toCoords(0, 1), createPiece('P', 'L')],
    [toCoords(1, 1), createPiece('P', 'L')],
    [toCoords(2, 1), createPiece('P', 'L')],
    [toCoords(3, 1), createPiece('P', 'L')],
    [toCoords(4, 1), createPiece('P', 'L')],
    [toCoords(5, 1), createPiece('P', 'L')],
    [toCoords(6, 1), createPiece('P', 'L')],
    [toCoords(7, 1), createPiece('P', 'L')],
    [toCoords(0, 0), createPiece('R', 'L')],
    [toCoords(1, 0), createPiece('N', 'L')],
    [toCoords(2, 0), createPiece('B', 'L')],
    [toCoords(3, 0), createPiece('Q', 'L')],
    [toCoords(4, 0), createPiece('K', 'L')],
    [toCoords(5, 0), createPiece('B', 'L')],
    [toCoords(6, 0), createPiece('N', 'L')],
    [toCoords(7, 0), createPiece('R', 'L')],
    [toCoords(0, 6), createPiece('P', 'D')],
    [toCoords(1, 6), createPiece('P', 'D')],
    [toCoords(2, 6), createPiece('P', 'D')],
    [toCoords(3, 6), createPiece('P', 'D')],
    [toCoords(4, 6), createPiece('P', 'D')],
    [toCoords(5, 6), createPiece('P', 'D')],
    [toCoords(6, 6), createPiece('P', 'D')],
    [toCoords(7, 6), createPiece('P', 'D')],
    [toCoords(0, 7), createPiece('R', 'D')],
    [toCoords(1, 7), createPiece('N', 'D')],
    [toCoords(2, 7), createPiece('B', 'D')],
    [toCoords(3, 7), createPiece('Q', 'D')],
    [toCoords(4, 7), createPiece('K', 'D')],
    [toCoords(5, 7), createPiece('B', 'D')],
    [toCoords(6, 7), createPiece('N', 'D')],
    [toCoords(7, 7), createPiece('R', 'D')]
  ]

  return data.reduce<Board>((board, [coords, piece]) => {
    board[coords] = piece
    return board
  }, Array(64).fill(null))
}

export const getEmptyBoard = (): Board => {
  return Array(64).fill(null)
}

const applyMove = (move: Move, board: Board): Board => {
  const newBoard: Board = [...board]

  const piece = newBoard[move.from.coords]

  if (piece === null) {
    throw new Error(`There's no piece at ${encodeCoords(move.from.coords)} to move`)
  }

  // Castle
  if (isCastle(move)) {
    const rookCoords = getFile(move.to.coords) - getFile(move.from.coords) < 0
      ? (move.from.piece.color === 'L' ? decodeCoords('a1') : decodeCoords('a8'))
      : (move.from.piece.color === 'L' ? decodeCoords('h1') : decodeCoords('h8'))

    const rook = newBoard[rookCoords]
    if (rook === null || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    const newRookCoords = (toCoords(
      getFile(move.to.coords) + ((getFile(move.to.coords) - getFile(move.from.coords)) / (-2)),
      getRank(move.from.coords)
    ))
    newBoard[newRookCoords] = rook
    newBoard[rookCoords] = null
  }

  // En Passant
  if (piece.type === 'P' && getFile(move.to.coords) !== getFile(move.from.coords) && newBoard[move.to.coords] === null) {
    const takenPawnCoords = toCoords(getFile(move.to.coords), getRank(move.from.coords))
    newBoard[takenPawnCoords] = null
  }

  newBoard[move.from.coords] = null
  newBoard[move.to.coords] = move.to.piece

  return newBoard
}
