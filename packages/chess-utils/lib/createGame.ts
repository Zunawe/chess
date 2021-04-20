import { Move, Board, Game, getStartingBoard } from '.'

export const createGame = (moves?: Move[], initialBoard?: Board): Game => ({
  moves: moves ?? [],
  initialBoard: initialBoard ?? getStartingBoard()
})
