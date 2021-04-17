import { applyMoves, getStartingBoard, Move, Game } from '.'

export const gameFromMoves = (moves: Move[]): Game => {
  const game = {
    moves: [],
    board: getStartingBoard()
  }
  return applyMoves(moves, game)
}
