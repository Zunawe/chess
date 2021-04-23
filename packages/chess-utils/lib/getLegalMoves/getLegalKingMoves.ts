import { isCastle, piecesEqual, MovePart, Move, Game, getBoard, getFile, getRank, isCheck, toCoords, validCoords } from '..'

export const getLegalKingMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)

  const legalMoves = getPossibleKingMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Castling
    if (isCastle(possibleMove)) {
      const rank = from.piece.color === 'W' ? 0 : 7

      // King must be in original position
      if (getRank(from.coords) !== rank || getFile(from.coords) !== 4) {
        return false
      }

      const direction = (getFile(to.coords) - getFile(from.coords)) / 2

      // All spaces between king and rook must not be occupied
      for (let f = 4 + direction; f !== 0 && f !== 7; f += direction) {
        if (board[toCoords(f, rank)] !== null) {
          return false
        }
      }

      // Rook of the same color must be in the corresponding corner
      const rook = board[toCoords(direction < 0 ? 0 : 7, rank)]
      if (rook === null || rook.color !== from.piece.color) {
        return false
      }

      // King and rook must have never moved
      for (let i = 0; i < game.moves.length; ++i) {
        // King moved
        if (piecesEqual(game.moves[i].from.piece, from.piece)) {
          return false
        }
        // Rook moved
        if (piecesEqual(game.moves[i].from.piece, rook) && game.moves[i].from.coords === toCoords(direction < 0 ? 0 : 7, rank)) {
          return false
        }
      }

      // Can't castle while in check
      if (isCheck(game, from.piece.color)) {
        return false
      }

      // King can't cross a space that would put him in check during castle
      const testMove: Move = {
        from: from,
        to: {
          ...to,
          coords: toCoords(getFile(from.coords) + direction, getRank(to.coords))
        }
      }
      if (isCheck({ ...game, moves: [...game.moves, testMove] }, from.piece.color)) {
        return false
      }

      return true
    }

    const pieceAtDestination = board[to.coords]
    if (pieceAtDestination === null) {
      return true
    } else {
      return pieceAtDestination.color !== from.piece.color
    }
  })

  return legalMoves
}

const getPossibleKingMoves = (from: MovePart): Move[] => {
  const { coords } = from
  const f = getFile(coords)
  const r = getRank(coords)

  const possibleMoves: Move[] = []
  if (validCoords(f + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 1, r + 0)
      }
    })
  }
  if (validCoords(f + 1, r - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 1, r - 1)
      }
    })
  }
  if (validCoords(r - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 0, r - 1)
      }
    })
  }
  if (validCoords(f - 1, r - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 1, r - 1)
      }
    })
  }
  if (validCoords(f - 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 1, r + 0)
      }
    })
  }
  if (validCoords(f - 1, r + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 1, r + 1)
      }
    })
  }
  if (validCoords(r + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 0, r + 1)
      }
    })
  }
  if (validCoords(f + 1, r + 1)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 1, r + 1)
      }
    })
  }
  if (validCoords(f + 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f + 2, r + 0)
      }
    })
  }
  if (validCoords(f - 2)) {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f - 2, r + 0)
      }
    })
  }

  return possibleMoves
}
