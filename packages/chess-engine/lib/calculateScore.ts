import * as Chess from 'chess-utils'
import { calculateMaterialScore } from './calculateMaterialScore'

export const calculateScore = (game: Chess.Game): number => {
  return calculateMaterialScore(game)
}
