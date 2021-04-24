import { validCoords, MovePart, Move, Game, getBoard, getRank, getFile } from '..'
import { toCoords } from '../coordinates'

export const getLegalPawnMoves = (from: MovePart, game: Game): Move[] => {
  const board = getBoard(game)
  const direction = from.piece.color === 'W' ? 1 : -1
  const legalMoves = getPossiblePawnMoves(from).filter((possibleMove) => {
    const { from, to } = possibleMove

    // Double move on first turn
    if (Math.abs(getRank(to.coords) - getRank(from.coords)) === 2) {
      return board[toCoords(getFile(from.coords), getRank(from.coords) + direction)] === null &&
        board[to.coords] === null
    }

    // Capturing a piece diagonally
    if (getFile(to.coords) - getFile(from.coords) !== 0) {
      const pieceAtDestination = board[to.coords]
      if (pieceAtDestination === null) {
        // Checking for en passant
        const prevMove = game.moves[game.moves.length - 1]
        if (
          prevMove !== undefined &&
          prevMove.from.piece.type === 'P' &&
          getFile(prevMove.to.coords) === getFile(to.coords) &&
          getRank(prevMove.to.coords) === getRank(from.coords) &&
          Math.abs(getRank(prevMove.to.coords) - getRank(prevMove.from.coords)) === 2
        ) {
          return true
        }
        return false
      } else {
        return pieceAtDestination.color !== from.piece.color
      }
    }

    return board[to.coords] === null
  })

  return legalMoves
}

const getPossiblePawnMoves = (from: MovePart): Move[] => {
  const { coords, piece } = from
  const direction = piece.color === 'W' ? 1 : -1
  const f = getFile(coords)
  const r = getRank(coords)
  const promoting = (piece.color === 'W' && r === 6) || (piece.color === 'B' && r === 1)
  const firstMove = (piece.color === 'W' && r === 1) || (piece.color === 'B' && r === 6)

  const possibleMoves: Move[] = []
  if (promoting) {
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(f, r + direction),
        piece: {
          ...piece,
          type: 'Q'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(f, r + direction),
        piece: {
          ...piece,
          type: 'R'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(f, r + direction),
        piece: {
          ...piece,
          type: 'B'
        }
      }
    })
    possibleMoves.push({
      from,
      to: {
        coords: toCoords(f, r + direction),
        piece: {
          ...piece,
          type: 'N'
        }
      }
    })

    if (validCoords(f + 1)) {
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f + 1, r + direction),
          piece: {
            ...piece,
            type: 'Q'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f + 1, r + direction),
          piece: {
            ...piece,
            type: 'R'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f + 1, r + direction),
          piece: {
            ...piece,
            type: 'B'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f + 1, r + direction),
          piece: {
            ...piece,
            type: 'N'
          }
        }
      })
    }
    if (validCoords(f - 1)) {
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f - 1, r + direction),
          piece: {
            ...piece,
            type: 'Q'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f - 1, r + direction),
          piece: {
            ...piece,
            type: 'R'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f - 1, r + direction),
          piece: {
            ...piece,
            type: 'B'
          }
        }
      })
      possibleMoves.push({
        from,
        to: {
          coords: toCoords(f - 1, r + direction),
          piece: {
            ...piece,
            type: 'N'
          }
        }
      })
    }
  } else {
    possibleMoves.push({
      from,
      to: {
        ...from,
        coords: toCoords(f, r + direction)
      }
    })
    if (validCoords(f + 1)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(f + 1, r + direction)
        }
      })
    }
    if (validCoords(f - 1)) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(f - 1, r + direction)
        }
      })
    }
    if (firstMove) {
      possibleMoves.push({
        from,
        to: {
          ...from,
          coords: toCoords(f, r + direction + direction)
        }
      })
    }
  }

  return possibleMoves
}
