import {
  movesEqual,
  isCastle,
  Coordinates,
  isInCheck,
  getLegalMoves,
  Move,
  Game,
  whoseTurn
} from '.'

export const isLegalMove = (move: Move, game: Game): boolean => {
  const color = move.from.piece.color
  if (color !== whoseTurn(game)) {
    return false
  }

  return getLegalMoves(move.from, game)
    // Move can't leave king in check
    .filter((legalMove) => !isInCheck(color, { ...game, moves: [...game.moves, legalMove] }))
    .filter((legalMove) => {
      if (isCastle(move)) {
        // King can't castle while in check
        if (isInCheck(color, game)) {
          return false
        }

        // King can't cross a space that would put him in check during castle
        const direction = (legalMove.to.coordinates.file - legalMove.from.coordinates.file) / 2
        const testMove: Move = {
          from: legalMove.from,
          to: {
            ...legalMove.to,
            coordinates: new Coordinates(legalMove.from.coordinates.file + direction, legalMove.to.coordinates.rank)
          }
        }
        return !isInCheck(color, { ...game, moves: [...game.moves, testMove] })
      }

      return true
    })
    .some((legalMove) => movesEqual(legalMove, move))
}
