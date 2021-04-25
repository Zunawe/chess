import { MovePart, Move, Game, isCheck, toCoords, getFile, getRank, isCastle } from '..'

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
        .filter((move) => {
          if (isCastle(move)) {
            // Can't castle while in check
            if (isCheck(game, from.piece.color)) {
              return false
            }

            const direction = (getFile(move.to.coords) - getFile(from.coords)) / 2
            // King can't cross a space that would put him in check during castle
            const testMove: Move = {
              from: from,
              to: {
                ...move.to,
                coords: toCoords(getFile(from.coords) + direction, getRank(move.to.coords))
              }
            }
            if (isCheck({ ...game, moves: [...game.moves, testMove] }, from.piece.color)) {
              return false
            }
          }
          return true
        })
      break
    default:
      throw new Error('Invalid piece type')
  }

  return legalMoves.filter((move) => !isCheck({ ...game, moves: [...game.moves, move] }, from.piece.color))
}
