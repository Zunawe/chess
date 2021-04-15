import { Coordinates } from '../util'

import { getPawnAttackedSpaces } from './getPawnAttackedSpaces'
import { getKnightAttackedSpaces } from './getKnightAttackedSpaces'
import { getKingAttackedSpaces } from './getKingAttackedSpaces'
import { getRookAttackedSpaces } from './getRookAttackedSpaces'
import { getBishopAttackedSpaces } from './getBishopAttackedSpaces'
import { getQueenAttackedSpaces } from './getQueenAttackedSpaces'

export * from './getPawnAttackedSpaces'
export * from './getKnightAttackedSpaces'
export * from './getKingAttackedSpaces'
export * from './getRookAttackedSpaces'
export * from './getBishopAttackedSpaces'
export * from './getQueenAttackedSpaces'

export const getAttackedSpaces = (from: [Coordinates, Piece], moves: Move[], board: Board): Coordinates[] => {
  switch (from[1].type) {
    case 'P':
      return getPawnAttackedSpaces(from, moves, board)
    case 'R':
      return getRookAttackedSpaces(from, moves, board)
    case 'N':
      return getKnightAttackedSpaces(from, moves, board)
    case 'B':
      return getBishopAttackedSpaces(from, moves, board)
    case 'Q':
      return getQueenAttackedSpaces(from, moves, board)
    case 'K':
      return getKingAttackedSpaces(from, moves, board)
    default:
      throw new Error('Invalid piece type')
  }
}
