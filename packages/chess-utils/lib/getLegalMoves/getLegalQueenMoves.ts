import { MovePart, Move, Game } from '..'

import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalRookMoves } from './getLegalRookMoves'

export const getLegalQueenMoves = (from: MovePart, game: Game): Move[] => {
  return [...getLegalBishopMoves(from, game), ...getLegalRookMoves(from, game)]
}
