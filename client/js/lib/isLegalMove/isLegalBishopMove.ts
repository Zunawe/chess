import { movesEqual, Coordinates } from '../util'

export const isLegalBishopMove = (move: Move, board: Board): boolean => {
  const { from } = move

  let neWall = false
  let seWall = false
  let swWall = false
  let nwWall = false

  const legalMoves: Move[] = []
  for (let i = 1; i < 8; ++i) {
    if (!neWall && from[0].file + i <= 7 && from[0].rank + i <= 7) {
      const nePiece = board[(new Coordinates(
        from[0].file + i,
        from[0].rank + i
      )).toString()]
      if (nePiece === undefined || nePiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file + i,
            from[0].rank + i
          ), from[1]]
        })
      }
      if (nePiece !== undefined) {
        neWall = true
      }
    }

    if (!seWall && from[0].file + i <= 7 && from[0].rank - i >= 0) {
      const sePiece = board[(new Coordinates(
        from[0].file + i,
        from[0].rank - i
      )).toString()]
      if (sePiece === undefined || sePiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file + i,
            from[0].rank - i
          ), from[1]]
        })
      }
      if (sePiece !== undefined) {
        seWall = true
      }
    }

    if (!swWall && from[0].file - i >= 0 && from[0].rank - i >= 0) {
      const swPiece = board[(new Coordinates(
        from[0].file - i,
        from[0].rank - i
      )).toString()]
      if (swPiece === undefined || swPiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file - i,
            from[0].rank - i
          ), from[1]]
        })
      }
      if (swPiece !== undefined) {
        swWall = true
      }
    }

    if (!nwWall && from[0].file - i >= 0 && from[0].rank + i <= 7) {
      const nwPiece = board[(new Coordinates(
        from[0].file - i,
        from[0].rank + i
      )).toString()]
      if (nwPiece === undefined || nwPiece.color !== from[1].color) {
        legalMoves.push({
          from,
          to: [new Coordinates(
            from[0].file - i,
            from[0].rank + i
          ), from[1]]
        })
      }
      if (nwPiece !== undefined) {
        nwWall = true
      }
    }
  }

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}
