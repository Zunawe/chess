import { piecesEqual, Move } from './index'

export const movesEqual = (a: Move, b: Move): boolean => {
  return a.from.coords === b.from.coords &&
    a.to.coords === b.to.coords &&
    piecesEqual(a.from.piece, b.from.piece) &&
    piecesEqual(a.to.piece, b.to.piece)
}
