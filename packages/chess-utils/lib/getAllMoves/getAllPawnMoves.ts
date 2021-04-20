import { getFile, getRank, toCoords, validCoords } from '../coordinates'
import { MovePart, Move } from '../index'

export const getAllPawnMoves = (from: MovePart): Move[] => {
  const { coords, piece } = from
  const direction = piece.color === 'L' ? 1 : -1
  const possibleMoves: Move[] = []
  if (validCoords(getRank(coords) + direction)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction
        )
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction
        ),
        piece: {
          ...piece,
          type: 'Q'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction
        ),
        piece: {
          ...piece,
          type: 'R'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction
        ),
        piece: {
          ...piece,
          type: 'B'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction
        ),
        piece: {
          ...piece,
          type: 'N'
        }
      }
    })
    if (validCoords(getFile(coords) + 1)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) + 1,
            getRank(coords) + direction
          )
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) + 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'Q'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) + 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'R'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) + 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'B'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) + 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'N'
          }
        }
      })
    }
    if (validCoords(getFile(coords) - 1)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(
            getFile(coords) - 1,
            getRank(coords) + direction
          )
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) - 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'Q'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) - 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'R'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) - 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'B'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(
            getFile(coords) - 1,
            getRank(coords) + direction
          ),
          piece: {
            ...piece,
            type: 'N'
          }
        }
      })
    }
  }
  if (validCoords(getRank(coords) + direction + direction)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(
          getFile(coords),
          getRank(coords) + direction + direction
        )
      }
    })
  }

  return possibleMoves
}
