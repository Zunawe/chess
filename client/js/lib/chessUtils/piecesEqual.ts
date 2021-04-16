export const piecesEqual = (a: Piece, b: Piece): boolean => {
  return a.color === b.color &&
    a.type === b.type
}
