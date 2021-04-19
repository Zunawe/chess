import { Coordinates, MovePart, Move } from '../index'

export const getAllBishopMoves = (from: MovePart): Move[] => {
  const { coordinates } = from
  const possibleMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + i,
          coordinates.rank + i
        )
      }
    })
    possibleMoves.push({
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + i,
          coordinates.rank - i
        )
      }
    })
    possibleMoves.push({
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - i,
          coordinates.rank - i
        )
      }
    })
    possibleMoves.push({
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - i,
          coordinates.rank + i
        )
      }
    })
  }

  return possibleMoves.filter((move) => {
    return move.to.coordinates.file <= 7 && move.to.coordinates.file >= 0 && move.to.coordinates.rank <= 7 && move.to.coordinates.rank >= 0
  })
}
