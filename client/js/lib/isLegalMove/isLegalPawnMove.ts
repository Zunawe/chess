import { getAllPawnMoves } from '../getAllMoves'
import { Coordinates, movesEqual } from '../util'

export const isLegalPawnMove = (move: Move, moves: Move[], board: Board): boolean => {
  const { from } = move
  const isFirstMove = from[1].color === 'L' ? from[0].rank === 1 : from[0].rank === 6
  const direction = from[1].color === 'L' ? 1 : -1
  const legalMoves = getAllPawnMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove
    if (Math.abs(to[0].rank - from[0].rank) === 2) {
      if (!isFirstMove) {
        return false
      }

      return board.get((new Coordinates(from[0].file, from[0].rank + direction)).toString()) === undefined &&
        board.get(to[0].toString()) === undefined
    }

    if (to[0].file - from[0].file !== 0) {
      const pieceAtDestination = board.get(to[0].toString())
      if (pieceAtDestination === undefined) {
        const prevMove = moves[moves.length - 1]
        if (prevMove !== undefined && prevMove.from[1].type === 'P' && prevMove.to[0].file === to[0].file) {
          if (Math.abs(prevMove.to[0].rank - prevMove.from[0].rank) === 2) {
            return true
          }
        }
        return false
      } else {
        return pieceAtDestination.color !== from[1].color
      }
    }

    return board.get(to[0].toString()) === undefined
  })

  return legalMoves.some((legalMove) => movesEqual(legalMove, move))
}
