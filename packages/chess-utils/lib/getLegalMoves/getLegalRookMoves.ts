import { MovePart, Move, Game, getBoard, getFile, getRank, toCoords } from '..'

export const getLegalRookMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  let eWall = false
  let sWall = false
  let wWall = false
  let nWall = false

  const f = getFile(from.coords)
  const r = getRank(from.coords)

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!eWall && f + i <= 7) {
      const nePiece = board[toCoords(f + i, r)]
      if (nePiece === null || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f + i, r)
          }
        })
      }
      if (nePiece !== null) {
        eWall = true
      }
    }

    if (!sWall && r - i >= 0) {
      const sePiece = board[(toCoords(f, r - i))]
      if (sePiece === null || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f, r - i)
          }
        })
      }
      if (sePiece !== null) {
        sWall = true
      }
    }

    if (!wWall && f - i >= 0) {
      const swPiece = board[(toCoords(f - i, r))]
      if (swPiece === null || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f - i, r)
          }
        })
      }
      if (swPiece !== null) {
        wWall = true
      }
    }

    if (!nWall && r + i <= 7) {
      const nwPiece = board[(toCoords(f, r + i))]
      if (nwPiece === null || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coords: toCoords(f, r + i)
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
