import { Coordinates, Move, Game, copyMove } from './index'

export const applyMove = (move: Move, game: Game): Game => {
  let newGame: Game = {
    moves: game.moves.map(copyMove),
    board: { ...game.board }
  }

  const piece = newGame.board[move.from[0].toString()]

  if (piece === undefined) {
    throw new Error('Invalid move')
  }

  // Castle
  if (piece.type === 'K' && Math.abs(move.to[0].file - move.from[0].file) === 2) {
    const rookCoords = move.to[0].file - move.from[0].file < 0
      ? (move.from[1].color === 'L' ? new Coordinates('a1') : new Coordinates('a8'))
      : (move.from[1].color === 'L' ? new Coordinates('h1') : new Coordinates('h8'))

    const rook = newGame.board[rookCoords.toString()]
    if (rook === undefined || rook.type !== 'R') {
      throw new Error('Couldn\'t find rook to castle with')
    }

    newGame = applyMove({
      from: [rookCoords, rook],
      to: [new Coordinates(move.to[0].file + ((move.to[0].file - move.from[0].file) / (-2)), move.from[0].rank), rook]
    }, newGame)
  }

  // En Passant
  if (piece.type === 'P' && move.to[0].file !== move.from[0].file && newGame.board[move.to[0].toString()] === undefined) {
    const takenPawnCoords = new Coordinates(move.to[0].file, move.from[0].rank)
    const takenPawn = newGame.board[takenPawnCoords.toString()]
    move.taken = [takenPawnCoords, takenPawn]
    delete newGame.board[takenPawnCoords.toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */
  }

  if (newGame.board[move.to[0].toString()] !== undefined) {
    move.taken = [move.to[0], newGame.board[move.to[0].toString()]]
  }
  delete newGame.board[move.from[0].toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */
  newGame.board[move.to[0].toString()] = move.to[1]

  newGame.moves.push(move)

  return newGame
}

export const applyMoves = (moves: Move[], game: Game): Game => {
  return moves.reduce((acc, move) => {
    return applyMove(move, acc)
  }, game)
}
