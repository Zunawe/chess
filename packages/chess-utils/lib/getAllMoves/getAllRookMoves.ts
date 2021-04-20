import { toCoords } from '../coordinates'
import { MovePart, Move, getFile, getRank } from '../index'

export const getAllRookMoves = (from: MovePart): Move[] => {
  const { coords } = from
  const possibleMoves: Move[] = []
  for (let i = 0; i < 8; ++i) {
    if (i !== getFile(coords)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            i,
            getRank(coords)
          )
        }
      })
    }
    if (i !== getRank(coords)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords),
            i
          )
        }
      })
    }
  }

  return possibleMoves
}
