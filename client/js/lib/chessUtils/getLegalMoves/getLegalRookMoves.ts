import { Coordinates } from '../index'

export const getLegalRookMoves = (from: [Coordinates, Piece], game: Game): Move[] => {
  const { board } = game

  let eWall = false
  let sWall = false
  let wWall = false
  let nWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!eWall && from[0].file + i <= 7) {
      const nePiece = board[(new Coordinates(
        from[0].file + i,
        from[0].rank
      )).toString()]
      if (nePiece === undefined || nePiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file + i,
            from[0].rank
          ), from[1]]
        })
      }
      if (nePiece !== undefined) {
        eWall = true
      }
    }

    if (!sWall && from[0].rank - i >= 0) {
      const sePiece = board[(new Coordinates(
        from[0].file,
        from[0].rank - i
      )).toString()]
      if (sePiece === undefined || sePiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file,
            from[0].rank - i
          ), from[1]]
        })
      }
      if (sePiece !== undefined) {
        sWall = true
      }
    }

    if (!wWall && from[0].file - i >= 0) {
      const swPiece = board[(new Coordinates(
        from[0].file - i,
        from[0].rank
      )).toString()]
      if (swPiece === undefined || swPiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file - i,
            from[0].rank
          ), from[1]]
        })
      }
      if (swPiece !== undefined) {
        wWall = true
      }
    }

    if (!nWall && from[0].rank + i <= 7) {
      const nwPiece = board[(new Coordinates(
        from[0].file,
        from[0].rank + i
      )).toString()]
      if (nwPiece === undefined || nwPiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file,
            from[0].rank + i
          ), from[1]]
        })
      }
      if (nwPiece !== undefined) {
        nWall = true
      }
    }
  }

  return legalMoves
}
