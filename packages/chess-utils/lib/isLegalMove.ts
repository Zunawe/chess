import {
  movesEqual,
  isCastle,
  isCheck,
  getLegalMoves,
  Move,
  Game,
  whoseTurn,
  getFile,
  getRank,
  toCoords
} from '.'

export const isLegalMove = (move: Move, game: Game): boolean => {
  const color = move.from.piece.color
  if (color !== whoseTurn(game)) {
    return false
  }

  return getLegalMoves(move.from, game)
    // Move can't leave king in check
    .filter((legalMove) => !isCheck({ ...game, moves: [...game.moves, legalMove] }))
    .filter((legalMove) => {
      if (isCastle(legalMove)) {
        // King can't castle while in check
        if (isCheck(game)) {
          return false
        }

        // King can't cross a space that would put him in check during castle
        const direction = (getFile(legalMove.to.coords) - getFile(legalMove.from.coords)) / 2
        const testMove: Move = {
          from: legalMove.from,
          to: {
            ...legalMove.to,
            coords: toCoords(getFile(legalMove.from.coords) + direction, getRank(legalMove.to.coords))
          }
        }
        return !isCheck({ ...game, moves: [...game.moves, testMove] })
      }

      return true
    })
    .some((legalMove) => movesEqual(legalMove, move))
}
