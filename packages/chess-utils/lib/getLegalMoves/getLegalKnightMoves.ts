import { validCoords, getFile, getRank, toCoords, MovePart, Move, Game, getBoard } from '../index'

export const getLegalKnightMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  const legalMoves = getPossibleKnightMoves(from).filter((move) => {
    const pieceAtDestination = board[move.to.coords]
    if (pieceAtDestination === null) {
      return true
    } else {
      return pieceAtDestination.color !== from.piece.color
    }
  })

  return legalMoves
}

const getPossibleKnightMoves = (from: MovePart): Move[] => {
  const { coords } = from
  const f = getFile(coords)
  const r = getRank(coords)

  const possibleMoves: Move[] = []
  if (validCoords(f + 1, r + 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 1, r + 2)
      }
    })
  }
  if (validCoords(f + 2, r + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 2, r + 1)
      }
    })
  }
  if (validCoords(f + 2, r - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 2, r - 1)
      }
    })
  }
  if (validCoords(f + 1, r - 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 1, r - 2)
      }
    })
  }
  if (validCoords(f - 1, r - 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 1, r - 2)
      }
    })
  }
  if (validCoords(f - 2, r - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 2, r - 1)
      }
    })
  }
  if (validCoords(f - 2, r + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 2, r + 1)
      }
    })
  }
  if (validCoords(f - 1, r + 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 1, r + 2)
      }
    })
  }

  return possibleMoves
}
