export const getAllPawnMoves = (piece: Piece): Move[] => {
  const direction = piece.color === 'L' ? 1 : -1
  const possibleMoves = [
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + (direction * 2),
        file: piece.coordinates.file
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file + 1
      }
    },
    {
      piece,
      to: {
        rank: piece.coordinates.rank + direction,
        file: piece.coordinates.file - 1
      }
    }
  ]

  return possibleMoves.filter((move) => {
    return move.to.file <= 7 && move.to.file >= 0 && move.to.rank <= 7 && move.to.rank >= 0
  })
}
