import { coordinatesEqual, piecesEqual, Move } from './index'

export const movesEqual = (a: Move, b: Move): boolean => {
  return coordinatesEqual(a.from.coordinates, b.from.coordinates) &&
    coordinatesEqual(a.to.coordinates, b.to.coordinates) &&
    piecesEqual(a.from.piece, b.from.piece) &&
    piecesEqual(a.to.piece, b.to.piece)
}
