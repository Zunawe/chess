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

export const getAttackedSpaces = (from: [Coordinates, Piece], game: Game): Coordinates[] => {
  switch (from[1].type) {
    case 'P':
      return getPawnAttackedSpaces(from, game)
    case 'R':
      return getRookAttackedSpaces(from, game)
    case 'N':
      return getKnightAttackedSpaces(from, game)
    case 'B':
      return getBishopAttackedSpaces(from, game)
    case 'Q':
      return getQueenAttackedSpaces(from, game)
    case 'K':
      return getKingAttackedSpaces(from, game)
    default:
      throw new Error('Invalid piece type')
  }
}
