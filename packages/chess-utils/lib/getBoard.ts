import { Coordinates, isCastle, Move, Board, Game } from '.'

export const getBoard = (game: Game): Board => {
  return game.moves.reduce((acc, move) => {
    return applyMove(move, acc)
  }, game.initialBoard)
}

/* eslint-disable @typescript-eslint/no-dynamic-delete */
const applyMove = (move: Move, board: Board): Board => {
  const newBoard: Board = { ...board }

  const piece = newBoard[move.from.coordinates.toString()]

  if (piece === undefined) {
    throw new Error(`There's no piece at ${move.from.coordinates.toString()} to move`)
  }

  // Castle
  if (isCastle(move)) {
    const rookCoords = move.to.coordinates.file - move.from.coordinates.file < 0
      ? (move.from.piece.color === 'L' ? new Coordinates('a1') : new Coordinates('a8'))
      : (move.from.piece.color === 'L' ? new Coordinates('h1') : new Coordinates('h8'))

    const rook = newBoard[rookCoords.toString()]
    if (rook === undefined || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    const newRookCoords = (new Coordinates(
      move.to.coordinates.file + ((move.to.coordinates.file - move.from.coordinates.file) / (-2)),
      move.from.coordinates.rank
    ))
    newBoard[newRookCoords.toString()] = rook
    delete newBoard[rookCoords.toString()]
  }

  // En Passant
  if (piece.type === 'P' && move.to.coordinates.file !== move.from.coordinates.file && newBoard[move.to.coordinates.toString()] === undefined) {
    const takenPawnCoords = new Coordinates(move.to.coordinates.file, move.from.coordinates.rank)
    delete newBoard[takenPawnCoords.toString()]
  }

  delete newBoard[move.from.coordinates.toString()]
  newBoard[move.to.coordinates.toString()] = move.to.piece

  return newBoard
}
/* eslint-enable @typescript-eslint/no-dynamic-delete */
