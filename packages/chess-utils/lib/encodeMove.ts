import { Game, isCastle, getLegalMoves, getBoard, getFile, getRank, encodeFile, encodeRank, encodeCoords } from '.'
import { isCheck } from './isCheck'
import { isCheckmate } from './isCheckmate'
import { piecesEqual } from './piecesEqual'

export const encodeMove = (i: number, game: Game): string => {
  const move = game.moves[i]
  if (move === undefined) {
    throw new Error(`Index out of bounds for provided moves: ${i}`)
  }

  const gameBeforeMove: Game = {
    ...game,
    moves: game.moves.slice(0, i)
  }
  const boardBeforeMove = getBoard(gameBeforeMove)
  const currentGame: Game = {
    ...game,
    moves: game.moves.slice(0, i + 1)
  }

  // Castling
  if (isCastle(move)) {
    return getFile(move.to.coords) === 6 ? 'O-O' : 'O-O-O'
  }

  // Disambiguation
  const ambiguousPieceCoords = []
  for (const [coords, piece] of boardBeforeMove.entries()) {
    if (coords === move.from.coords || piece === null || piece.color !== move.from.piece.color) {
      continue
    }

    const isAmbiguous = getLegalMoves({ coords, piece }, gameBeforeMove)
      .some((possibleMove) => possibleMove.to.coords === move.to.coords && piecesEqual(possibleMove.to.piece, move.to.piece))
    if (isAmbiguous) {
      ambiguousPieceCoords.push(coords)
    }
  }

  let disambiguation = ''
  if (ambiguousPieceCoords.length > 0) {
    if (ambiguousPieceCoords.every((c) => getFile(c) !== getFile(move.from.coords))) {
      disambiguation = encodeFile(getFile(move.from.coords))
    } else if (ambiguousPieceCoords.every((c) => getRank(c) !== getRank(move.from.coords))) {
      disambiguation = encodeRank(getRank(move.from.coords))
    } else {
      // Incredibly uncommon, but technically possible
      disambiguation = encodeCoords(move.from.coords)
    }
  }

  // Promotion
  let promotion = ''
  if (move.from.piece.type !== move.to.piece.type) {
    promotion = '=' + move.to.piece.type
  }

  const takes = boardBeforeMove[move.to.coords] === null ? '' : 'x'
  const pieceCode = move.from.piece.type === 'P' ? (takes.length === 0 ? '' : encodeFile(getFile(move.from.coords))) : move.from.piece.type
  const square = encodeCoords(move.to.coords)
  const check = isCheckmate(currentGame) ? '#' : (isCheck(currentGame) ? '+' : '')

  return pieceCode + disambiguation + takes + square + promotion + check
}
