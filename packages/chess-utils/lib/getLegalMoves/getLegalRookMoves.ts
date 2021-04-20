import { MovePart, Move, Game, getBoard, getFile, getRank, toCoords } from '../index'

export const getLegalRookMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  let eWall = false
  let sWall = false
  let wWall = false
  let nWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!eWall && getFile(from.coords) + i <= 7) {
      const nePiece = board[toCoords(getFile(from.coords) + i, getRank(from.coords))]
      if (nePiece === null || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) + i,
              getRank(from.coords)
            )
          }
        })
      }
      if (nePiece !== null) {
        eWall = true
      }
    }

    if (!sWall && getRank(from.coords) - i >= 0) {
      const sePiece = board[(toCoords(
        getFile(from.coords),
        getRank(from.coords) - i
      ))]
      if (sePiece === null || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords),
              getRank(from.coords) - i
            )
          }
        })
      }
      if (sePiece !== null) {
        sWall = true
      }
    }

    if (!wWall && getFile(from.coords) - i >= 0) {
      const swPiece = board[(toCoords(
        getFile(from.coords) - i,
        getRank(from.coords)
      ))]
      if (swPiece === null || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords) - i,
              getRank(from.coords)
            )
          }
        })
      }
      if (swPiece !== null) {
        wWall = true
      }
    }

    if (!nWall && getRank(from.coords) + i <= 7) {
      const nwPiece = board[(toCoords(
        getFile(from.coords),
        getRank(from.coords) + i
      ))]
      if (nwPiece === null || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(
              getFile(from.coords),
              getRank(from.coords) + i
            )
          }
        })
      }
      if (nwPiece !== null) {
        nWall = true
      }
    }
  }

  return legalMoves
}
