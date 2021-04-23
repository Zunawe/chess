import { toCoords, validCoords } from '../coordinates'
import { MovePart, Move, Game, getBoard, getFile, getRank } from '../index'

export const getLegalBishopMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  let neWall = false
  let seWall = false
  let swWall = false
  let nwWall = false

  const f = getFile(from.coords)
  const r = getRank(from.coords)

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!neWall && validCoords(f + i, r + i)) {
      const nePiece = board[toCoords(f + i, r + i)]
      if (nePiece === null || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f + i, r + i)
          }
        })
      }
      if (nePiece !== null) {
        neWall = true
      }
    }

    if (!seWall && validCoords(f + i, r - i)) {
      const sePiece = board[toCoords(f + i, r - i)]
      if (sePiece === null || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f + i, r - i)
          }
        })
      }
      if (sePiece !== null) {
        seWall = true
      }
    }

    if (!swWall && validCoords(f - i, r - i)) {
      const swPiece = board[toCoords(f - i, r - i)]
      if (swPiece === null || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f - i, r - i)
          }
        })
      }
      if (swPiece !== null) {
        swWall = true
      }
    }

    if (!nwWall && validCoords(f - i, r + i)) {
      const nwPiece = board[toCoords(f - i, r + i)]
      if (nwPiece === null || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f - i, r + i)
          }
        })
      }
      if (nwPiece !== null) {
        nwWall = true
      }
    }
  }

  return legalMoves
}
