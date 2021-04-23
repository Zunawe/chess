import { MovePart, Move, Game, isCheck } from '..'

import { getLegalPawnMoves } from './getLegalPawnMoves'
import { getLegalKnightMoves } from './getLegalKnightMoves'
import { getLegalKingMoves } from './getLegalKingMoves'
import { getLegalRookMoves } from './getLegalRookMoves'
import { getLegalBishopMoves } from './getLegalBishopMoves'
import { getLegalQueenMoves } from './getLegalQueenMoves'

export const getLegalMoves = (from: MovePart, game: Game): Move[] => {
  let legalMoves = []
  switch (from.piece.type) {
    case 'P':
      legalMoves = getLegalPawnMoves(from, game)
      break
    case 'R':
      legalMoves = getLegalRookMoves(from, game)
      break
    case 'N':
      legalMoves = getLegalKnightMoves(from, game)
      break
    case 'B':
      legalMoves = getLegalBishopMoves(from, game)
      break
    case 'Q':
      legalMoves = getLegalQueenMoves(from, game)
      break
    case 'K':
      legalMoves = getLegalKingMoves(from, game)
      break
    default:
      throw new Error('Invalid piece type')
  }

  return legalMoves.filter((move) => !isCheck({ ...game, moves: [...game.moves, move] }, from.piece.color))
}
