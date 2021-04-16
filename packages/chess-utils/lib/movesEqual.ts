import { coordinatesEqual, piecesEqual, Move } from './index'

export const movesEqual = (a: Move, b: Move): boolean => {
  return coordinatesEqual(a.from[0], b.from[0]) &&
    coordinatesEqual(a.to[0], b.to[0]) &&
    piecesEqual(a.from[1], b.from[1]) &&
    piecesEqual(a.to[1], b.to[1])
}
