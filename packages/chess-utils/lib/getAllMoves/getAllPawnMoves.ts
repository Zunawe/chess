import { Coordinates, MovePart, Move } from '../index'

export const getAllPawnMoves = (from: MovePart): Move[] => {
  const { coordinates, piece } = from
  const direction = piece.color === 'L' ? 1 : -1
  const possibleMoves: Move[] = [
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction
        )
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'Q'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'R'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'B'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'N'
        }
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file,
          coordinates.rank + direction + direction
        )
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + direction
        )
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'Q'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'R'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'B'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file + 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'N'
        }
      }
    },
    {
      from,
      to: {
        ...from,
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + direction
        )
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'Q'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'R'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'B'
        }
      }
    },
    {
      from,
      to: {
        coordinates: new Coordinates(
          coordinates.file - 1,
          coordinates.rank + direction
        ),
        piece: {
          ...piece,
          type: 'N'
        }
      }
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to.coordinates.file <= 7 && move.to.coordinates.file >= 0 && move.to.coordinates.rank <= 7 && move.to.coordinates.rank >= 0
  })
}
