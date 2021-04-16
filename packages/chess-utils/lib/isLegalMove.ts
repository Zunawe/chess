import {
  applyMove,
  movesEqual,
  isCastle,
  Coordinates,
  isInCheck,
  getLegalMoves,
  Move,
  Game,
  Color
} from './index'

export const isLegalMove = (move: Move, game: Game): boolean => {
  const { board, moves } = game

  const turn: Color = moves.length % 2 === 0 ? 'L' : 'D'
  if (move.from[1].color !== turn) {
    return false
  }

  return getLegalMoves(move.from, game)
    .filter((legalMove) => !isInCheck(move.from[1].color, { board: applyMove(legalMove, board), moves: [...moves, legalMove] }))
    .filter((legalMove) => {
      if (isCastle(move)) {
        const direction = (legalMove.to[0].file - legalMove.from[0].file) / 2
        const testMove: Move = {
          from: legalMove.from,
          to: [new Coordinates(legalMove.from[0].file + direction, legalMove.to[0].rank), legalMove.to[1]]
        }

        return !isInCheck(move.from[1].color, { board: applyMove(testMove, board), moves: [...moves, testMove] })
      }

      return true
    })
    .some((legalMove) => movesEqual(legalMove, move))
}
