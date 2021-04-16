import { Coordinates, Piece, Move } from '../index'

export const getAllRookMoves = (from: [Coordinates, Piece]): Move[] => {
  const [coordinates, piece] = from
  const possibleMoves: Move[] = []
  for (let i = 0; i < 8; ++i) {
    if (i !== coordinates.file) {
      possibleMoves.push({
        from,
        to: [new Coordinates(
          i,
          coordinates.rank
        ), piece]
      })
    }
    if (i !== coordinates.rank) {
      possibleMoves.push({
        from,
        to: [new Coordinates(
          coordinates.file,
          i
        ), piece]
      })
    }
  }

  return possibleMoves
}
