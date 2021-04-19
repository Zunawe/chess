import { Coordinates, MovePart, Move } from '../index'

export const getAllRookMoves = (from: MovePart): Move[] => {
  const { coordinates } = from
  const possibleMoves: Move[] = []
  for (let i = 0; i < 8; ++i) {
    if (i !== coordinates.file) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coordinates: new Coordinates(
            i,
            coordinates.rank
          )
        }
      })
    }
    if (i !== coordinates.rank) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coordinates: new Coordinates(
            coordinates.file,
            i
          )
        }
      })
    }
  }

  return possibleMoves
}
