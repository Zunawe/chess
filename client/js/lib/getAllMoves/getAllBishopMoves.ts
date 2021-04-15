import { Coordinates } from '../util'

export const getAllBishopMoves = (from: [Coordinates, Piece]): Move[] => {
  const [coordinates, piece] = from
  const possibleMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    possibleMoves.push({
      from,
      to: [new Coordinates(
        coordinates.file + i,
        coordinates.rank + i
      ), piece]
    })
    possibleMoves.push({
      from,
      to: [new Coordinates(
        coordinates.file + i,
        coordinates.rank - i
      ), piece]
    })
    possibleMoves.push({
      from,
      to: [new Coordinates(
        coordinates.file - i,
        coordinates.rank - i
      ), piece]
    })
    possibleMoves.push({
      from,
      to: [new Coordinates(
        coordinates.file - i,
        coordinates.rank + i
      ), piece]
    })
  }

  return possibleMoves.filter((move) => {
    return move.to[0].file <= 7 && move.to[0].file >= 0 && move.to[0].rank <= 7 && move.to[0].rank >= 0
  })
}
