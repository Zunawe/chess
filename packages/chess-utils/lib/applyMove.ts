import { Coordinates, Move, Board } from './index'

export const applyMove = (move: Move, board: Board): Board => {
  let newBoard: Board = {
    ...board
  }
  const piece = newBoard[move.from[0].toString()]

  if (piece === undefined) {
    throw new Error('Invalid move')
  }

  // Castle
  if (piece.type === 'K' && Math.abs(move.to[0].file - move.from[0].file) === 2) {
    const rookCoords = move.to[0].file - move.from[0].file < 0
      ? (move.from[1].color === 'L' ? new Coordinates('a1') : new Coordinates('a8'))
      : (move.from[1].color === 'L' ? new Coordinates('h1') : new Coordinates('h8'))

    const rook = newBoard[rookCoords.toString()]
    if (rook === undefined || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    newBoard = applyMove({
      from: [rookCoords, rook],
      to: [new Coordinates(move.to[0].file + ((move.to[0].file - move.from[0].file) / (-2)), move.from[0].rank), rook]
    }, newBoard)
  }

  // En Passant
  if (piece.type === 'P' && move.to[0].file !== move.from[0].file && newBoard[move.to[0].toString()] === undefined) {
    const takenPawnCoords = new Coordinates(move.to[0].file, move.from[0].rank)
    delete newBoard[takenPawnCoords.toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */
  }

  delete newBoard[move.from[0].toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */
  newBoard[move.to[0].toString()] = move.to[1]

  return newBoard
}

export const applyMoves = (moves: Move[], board: Board): Board => {
  return moves.reduce((acc, move) => {
    return applyMove(move, acc)
  }, board)
}
