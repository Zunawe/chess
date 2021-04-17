import { Coordinates, Move, Game, copyMove, isCastle } from './index'

/* eslint-disable @typescript-eslint/no-dynamic-delete */
export const applyMove = (move: Move, game: Game): Game => {
  const newGame: Game = {
    moves: game.moves.map(copyMove),
    board: { ...game.board }
  }

  const piece = newGame.board[move.from[0].toString()]

  if (piece === undefined) {
    throw new Error(`There's no piece at ${move.from[0].toString()} to move`)
  }

  // Castle
  if (isCastle(move)) {
    const rookCoords = move.to[0].file - move.from[0].file < 0
      ? (move.from[1].color === 'L' ? new Coordinates('a1') : new Coordinates('a8'))
      : (move.from[1].color === 'L' ? new Coordinates('h1') : new Coordinates('h8'))

    const rook = newGame.board[rookCoords.toString()]
    if (rook === undefined || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    const newRookCoords = (new Coordinates(move.to[0].file + ((move.to[0].file - move.from[0].file) / (-2)), move.from[0].rank))
    newGame.board[newRookCoords.toString()] = rook
    delete newGame.board[rookCoords.toString()]
  }

  // En Passant
  if (piece.type === 'P' && move.to[0].file !== move.from[0].file && newGame.board[move.to[0].toString()] === undefined) {
    const takenPawnCoords = new Coordinates(move.to[0].file, move.from[0].rank)
    delete newGame.board[takenPawnCoords.toString()]
  }

  delete newGame.board[move.from[0].toString()]
  newGame.board[move.to[0].toString()] = move.to[1]

  newGame.moves.push(move)

  return newGame
}
/* eslint-enable @typescript-eslint/no-dynamic-delete */

export const applyMoves = (moves: Move[], game: Game): Game => {
  return moves.reduce((acc, move) => {
    return applyMove(move, acc)
  }, game)
}
