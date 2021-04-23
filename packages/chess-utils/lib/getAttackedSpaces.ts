import { MovePart, Game, Move, getFile, isCastle } from '.'

import { getLegalBishopMoves } from './getLegalMoves/getLegalBishopMoves'
import { getLegalKingMoves } from './getLegalMoves/getLegalKingMoves'
import { getLegalKnightMoves } from './getLegalMoves/getLegalKnightMoves'
import { getLegalPawnMoves } from './getLegalMoves/getLegalPawnMoves'
import { getLegalQueenMoves } from './getLegalMoves/getLegalQueenMoves'
import { getLegalRookMoves } from './getLegalMoves/getLegalRookMoves'

export const getAttackedSpaces = (from: MovePart, game: Game): number[] => {
  let moves: Move[] = []
  switch (from.piece.type) {
    case 'R':
      moves = getLegalRookMoves(from, game)
      break
    case 'N':
      moves = getLegalKnightMoves(from, game)
      break
    case 'B':
      moves = getLegalBishopMoves(from, game)
      break
    case 'Q':
      moves = getLegalQueenMoves(from, game)
      break
    case 'P':
      moves = getLegalPawnMoves(from, game).filter((move) => {
        return getFile(move.to.coords) !== getFile(move.from.coords)
      })
      break
    case 'K':
      moves = getLegalKingMoves(from, game).filter((move) => !isCastle(move))
      break
    default:
      throw new Error('Invalid piece type')
  }

  return moves.map((move) => move.to.coords)
}
