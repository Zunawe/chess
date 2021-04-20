import { getFile, getRank, toCoords, validCoords } from '../coordinates'
import { MovePart, Move } from '../index'

export const getAllBishopMoves = (from: MovePart): Move[] => {
  const { coords } = from
  const possibleMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (validCoords(getFile(coords) + i, getRank(coords) + i)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) + i,
            getRank(coords) + i
          )
        }
      })
    }
    if (validCoords(getFile(coords) + i, getRank(coords) - i)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) + i,
            getRank(coords) - i
          )
        }
      })
    }
    if (validCoords(getFile(coords) - i, getRank(coords) - i)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) - i,
            getRank(coords) - i
          )
        }
      })
    }
    if (validCoords(getFile(coords) - i, getRank(coords) + i)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) - i,
            getRank(coords) + i
          )
        }
      })
    }
  }

  return possibleMoves
}
