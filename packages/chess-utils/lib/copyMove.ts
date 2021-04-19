import { Move, Coordinates, createPiece } from '.'

export const copyMove = (move: Move): Move => {
  return {
    from: {
      coordinates: new Coordinates(move.from.coordinates.file, move.from.coordinates.rank),
      piece: createPiece(move.from.piece.type, move.from.piece.color)
    },
    to: {
      coordinates: new Coordinates(move.to.coordinates.file, move.to.coordinates.rank),
      piece: createPiece(move.to.piece.type, move.to.piece.color)
    }
  }
}
