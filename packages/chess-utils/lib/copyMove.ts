import { Move, createPiece } from '.'

export const copyMove = (move: Move): Move => {
  return {
    from: {
      coords: move.from.coords,
      piece: createPiece(move.from.piece.type, move.from.piece.color)
    },
    to: {
      coords: move.to.coords,
      piece: createPiece(move.to.piece.type, move.to.piece.color)
    }
  }
}
