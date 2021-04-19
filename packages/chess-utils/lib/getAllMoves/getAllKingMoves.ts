import { Coordinates, MovePart, Move } from '../index'

export const getAllKingMoves = (from: MovePart): Move[] => {
  const { coordinates } = from
  const possibleMoves: Move[] = [
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + 0
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank - 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 0,
          coordinates.rank - 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank - 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + 0
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 0,
          coordinates.rank + 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + 1
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 2,
          coordinates.rank + 0
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - 2,
          coordinates.rank + 0
        )
      }
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to.coordinates.file <= 7 && move.to.coordinates.file >= 0 && move.to.coordinates.rank <= 7 && move.to.coordinates.rank >= 0
  })
}
