import { Move, encodeCoords } from '.'

export const serializeMove = (move: Move): string => {
  return move.from.piece.color + move.from.piece.type + encodeCoords(move.from.coords) + move.to.piece.type + encodeCoords(move.to.coords)
}
