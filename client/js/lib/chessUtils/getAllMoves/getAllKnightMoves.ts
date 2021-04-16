import { Coordinates } from '../index'

export const getAllKnightMoves = (from: [Coordinates, Piece]): Move[] => {
  const [coordinates, piece] = from
  const possibleMoves: Move[] = [
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + 2
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 2,
        coordinates.rank + 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 2,
        coordinates.rank - 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank - 2
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank - 2
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 2,
        coordinates.rank - 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 2,
        coordinates.rank + 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + 2
      ), piece]
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to[0].file <= 7 && move.to[0].file >= 0 && move.to[0].rank <= 7 && move.to[0].rank >= 0
  })
}
