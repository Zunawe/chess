import { Coordinates } from '../index'

export const getAllKingMoves = (from: [Coordinates, Piece]): Move[] => {
  const [coordinates, piece] = from
  const possibleMoves: Move[] = [
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + 0
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank - 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 0,
        coordinates.rank - 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank - 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + 0
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 0,
        coordinates.rank + 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + 1
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 2,
        coordinates.rank + 0
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 2,
        coordinates.rank + 0
      ), piece]
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to[0].file <= 7 && move.to[0].file >= 0 && move.to[0].rank <= 7 && move.to[0].rank >= 0
  })
}
