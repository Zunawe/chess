import { Coordinates, MovePart, Move, Game, getBoard } from '../index'

export const getLegalBishopMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  let neWall = false
  let seWall = false
  let swWall = false
  let nwWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!neWall && from.coordinates.file + i <= 7 && from.coordinates.rank + i <= 7) {
      const nePiece = board[(new Coordinates(
        from.coordinates.file + i,
        from.coordinates.rank + i
      )).toString()]
      if (nePiece === undefined || nePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file + i,
              from.coordinates.rank + i
            )
          }
        })
      }
      if (nePiece !== undefined) {
        neWall = true
      }
    }

    if (!seWall && from.coordinates.file + i <= 7 && from.coordinates.rank - i >= 0) {
      const sePiece = board[(new Coordinates(
        from.coordinates.file + i,
        from.coordinates.rank - i
      )).toString()]
      if (sePiece === undefined || sePiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file + i,
              from.coordinates.rank - i
            )
          }
        })
      }
      if (sePiece !== undefined) {
        seWall = true
      }
    }

    if (!swWall && from.coordinates.file - i >= 0 && from.coordinates.rank - i >= 0) {
      const swPiece = board[(new Coordinates(
        from.coordinates.file - i,
        from.coordinates.rank - i
      )).toString()]
      if (swPiece === undefined || swPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file - i,
              from.coordinates.rank - i
            )
          }
        })
      }
      if (swPiece !== undefined) {
        swWall = true
      }
    }

    if (!nwWall && from.coordinates.file - i >= 0 && from.coordinates.rank + i <= 7) {
      const nwPiece = board[(new Coordinates(
        from.coordinates.file - i,
        from.coordinates.rank + i
      )).toString()]
      if (nwPiece === undefined || nwPiece.color !== from.piece.color) {
        legalMoves.push({
          from,
          to: {
            ...from,
            coordinates: new Coordinates(
              from.coordinates.file - i,
              from.coordinates.rank + i
            )
          }
        })
      }
      if (nwPiece !== undefined) {
        nwWall = true
      }
    }
  }

  return legalMoves
}
