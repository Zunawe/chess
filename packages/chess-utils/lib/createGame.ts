import { getStartingBoard } from './getStartingBoard'
import { Move, Board, Game } from '.'

export const createGame = (moves?: Move[], initialBoard?: Board): Game => ({
  moves: moves ?? [],
  initialBoard: initialBoard ?? getStartingBoard()
})
