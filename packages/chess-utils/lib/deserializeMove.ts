import { Move, PieceType, Color, createPiece } from '.'
import { decodeCoords } from './coordinates'

export const deserializeMove = (serializedMove: string): Move => {
  const [, color, p1, c1, p2, c2] = serializedMove.match(/^(L|D)([PQRBNK])([abcdefgh][12345678])([PQRBNK])([abcdefgh][12345678])$/) ?? []

  if (
    color === undefined ||
    p1 === undefined ||
    c1 === undefined ||
    p2 === undefined ||
    c2 === undefined
  ) throw new Error(`Could not deserialize move: ${serializedMove}`)

  return {
    from: { coords: decodeCoords(c1), piece: createPiece(p1 as PieceType, color as Color) },
    to: { coords: decodeCoords(c2), piece: createPiece(p2 as PieceType, color as Color) }
  }
}
