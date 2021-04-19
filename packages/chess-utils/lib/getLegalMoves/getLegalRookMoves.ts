import { Coordinates, MovePart, Move, Game, getBoard } from '../index'

export const getLegalRookMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  let eWall = false
  let sWall = false
  let wWall = false
  let nWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!eWall && from.coordinates.file + i <= 7) {
      const nePiece = board[(new Coordinates(
        from.coordinates.file + i,
        from.coordinates.rank
      )).toString()]
      if (nePiece === undefined || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file + i,
              from.coordinates.rank
            )
          }
        })
      }
      if (nePiece !== undefined) {
        eWall = true
      }
    }

    if (!sWall && from.coordinates.rank - i >= 0) {
      const sePiece = board[(new Coordinates(
        from.coordinates.file,
        from.coordinates.rank - i
      )).toString()]
      if (sePiece === undefined || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file,
              from.coordinates.rank - i
            )
          }
        })
      }
      if (sePiece !== undefined) {
        sWall = true
      }
    }

    if (!wWall && from.coordinates.file - i >= 0) {
      const swPiece = board[(new Coordinates(
        from.coordinates.file - i,
        from.coordinates.rank
      )).toString()]
      if (swPiece === undefined || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file - i,
              from.coordinates.rank
            )
          }
        })
      }
      if (swPiece !== undefined) {
        wWall = true
      }
    }

    if (!nWall && from.coordinates.rank + i <= 7) {
      const nwPiece = board[(new Coordinates(
        from.coordinates.file,
        from.coordinates.rank + i
      )).toString()]
      if (nwPiece === undefined || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file,
              from.coordinates.rank + i
            )
          }
        })
      }
      if (nwPiece !== undefined) {
        nWall = true
      }
    }
  }

  return legalMoves
}
