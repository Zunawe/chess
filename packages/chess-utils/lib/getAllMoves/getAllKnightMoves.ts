import { getFile, getRank, toCoords, validCoords } from '../coordinates'
import { MovePart, Move } from '../index'

export const getAllKnightMoves = (from: MovePart): Move[] => {
  const { coords } = from
  const possibleMoves: Move[] = []
  if (validCoords(getFile(coords) + 1, getRank(coords) + 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) + 1,
          getRank(coords) + 2
        )
      }
    })
  }
  if (validCoords(getFile(coords) + 2, getRank(coords) + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) + 2,
          getRank(coords) + 1
        )
      }
    })
  }
  if (validCoords(getFile(coords) + 2, getRank(coords) - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) + 2,
          getRank(coords) - 1
        )
      }
    })
  }
  if (validCoords(getFile(coords) + 1, getRank(coords) - 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) + 1,
          getRank(coords) - 2
        )
      }
    })
  }
  if (validCoords(getFile(coords) - 1, getRank(coords) - 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) - 1,
          getRank(coords) - 2
        )
      }
    })
  }
  if (validCoords(getFile(coords) - 2, getRank(coords) - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) - 2,
          getRank(coords) - 1
        )
      }
    })
  }
  if (validCoords(getFile(coords) - 2, getRank(coords) + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) - 2,
          getRank(coords) + 1
        )
      }
    })
  }
  if (validCoords(getFile(coords) - 1, getRank(coords) + 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords) - 1,
          getRank(coords) + 2
        )
      }
    })
  }

  return possibleMoves
}
