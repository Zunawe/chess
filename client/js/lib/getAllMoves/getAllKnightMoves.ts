export const getAllKnightMoves = (piece: Piece): Move[] => {
  const possibleMoves = [
    {
      piece,
      to: {
        rank: piece.coordinates.rank + 2,
        file: piece.coordinates.file + 1
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + 1,
        file: piece.coordinates.file + 2
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank - 1,
        file: piece.coordinates.file + 2
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank - 2,
        file: piece.coordinates.file + 1
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank - 2,
        file: piece.coordinates.file - 1
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank - 1,
        file: piece.coordinates.file - 2
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + 1,
        file: piece.coordinates.file - 2
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + 2,
        file: piece.coordinates.file - 1
      }
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to.file <= 7 && move.to.file >= 0 && move.to.rank <= 7 && move.to.rank >= 0
  })
}
