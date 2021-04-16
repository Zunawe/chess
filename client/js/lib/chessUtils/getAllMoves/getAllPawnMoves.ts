import { Coordinates } from '../index'

export const getAllPawnMoves = (from: [Coordinates, Piece]): Move[] => {
  const [coordinates, piece] = from
  const direction = piece.color === 'L' ? 1 : -1
  const possibleMoves: Move[] = [
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'Q'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'R'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'B'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'N'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file,
        coordinates.rank + direction + direction
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + direction
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'Q'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'R'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'B'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file + 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'N'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + direction
      ), piece]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'Q'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'R'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'B'
      }]
    },
    {
      from,
      to: [new Coordinates(
        coordinates.file - 1,
        coordinates.rank + direction
      ), {
        ...piece,
        type: 'N'
      }]
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to[0].file <= 7 && move.to[0].file >= 0 && move.to[0].rank <= 7 && move.to[0].rank >= 0
  })
}
