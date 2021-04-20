import { toCoords, validCoords } from '../coordinates'
import { MovePart, Move, Game, getBoard, getFile, getRank } from '../index'

export const getLegalBishopMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  let neWall = false
  let seWall = false
  let swWall = false
  let nwWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!neWall && validCoords(getFile(from.coords) + i, getRank(from.coords) + i)) {
      const nePiece = board[toCoords(
        getFile(from.coords) + i,
        getRank(from.coords) + i
      )]
      if (nePiece === null || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) + i,
              getRank(from.coords) + i
            )
          }
        })
      }
      if (nePiece !== null) {
        neWall = true
      }
    }

    if (!seWall && validCoords(getFile(from.coords) + i, getRank(from.coords) - i)) {
      const sePiece = board[toCoords(
        getFile(from.coords) + i,
        getRank(from.coords) - i
      )]
      if (sePiece === null || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) + i,
              getRank(from.coords) - i
            )
          }
        })
      }
      if (sePiece !== null) {
        seWall = true
      }
    }

    if (!swWall && validCoords(getFile(from.coords) - i, getRank(from.coords) - i)) {
      const swPiece = board[toCoords(
        getFile(from.coords) - i,
        getRank(from.coords) - i
      )]
      if (swPiece === null || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) - i,
              getRank(from.coords) - i
            )
          }
        })
      }
      if (swPiece !== null) {
        swWall = true
      }
    }

    if (!nwWall && validCoords(getFile(from.coords) - i, getRank(from.coords) + i)) {
      const nwPiece = board[toCoords(
        getFile(from.coords) - i,
        getRank(from.coords) + i
      )]
      if (nwPiece === null || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) - i,
              getRank(from.coords) + i
            )
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
