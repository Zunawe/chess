import { Move, isCastle, gameFromMoves, getLegalMoves, Coordinates } from '.'
import { isInCheck } from './isInCheck'
import { isInCheckmate } from './isInCheckmate'
import { whoseTurn } from './whoseTurn'

export const encodeMove = (i: number, moves: Move[]): string => {
  const move = moves[i]
  const gameBeforeMove = gameFromMoves(moves.slice(0, i))
  const currentGame = gameFromMoves(moves.slice(0, i + 1))

  // Castling
  if (isCastle(move)) {
    return move.to[0].file === 6 ? '0-0' : '0-0-0'
  }

  // En Passant
  // let enPassant = ''
  // if (Object.entries(gameBeforeMove.board).length < Object.entries(currentGame.board).length &&
  //   gameBeforeMove.board[move.to[0].toString()] === undefined) {
  //     enPassant = 'e.p.'
  //   }

  // Disambiguation
  const otherPieceLocations = Object.entries(gameBeforeMove.board)
    .filter(([c, p]) => {
      return c !== move.from[0].toString() && p.color === whoseTurn(moves) && p.type === move.from[1].type
    })
    .filter(([c, p]) => {
      return getLegalMoves([new Coordinates(c), p], gameBeforeMove).includes({
        from: [move.from[0], p],
        to: move.to
      })
    })
    .map(([c]) => new Coordinates(c))

  let disambiguation = ''
  if (otherPieceLocations.length > 0) {
    if (otherPieceLocations.every(({ file }) => file !== move.from[0].file)) {
      disambiguation = move.from[0].toString()[0]
    } else if (otherPieceLocations.every(({ rank }) => rank !== move.from[0].rank)) {
      disambiguation = move.from[0].toString()[1]
    } else {
      // Incredibly uncommon, but technically possible
      disambiguation = move.from[0].toString()
    }
  }

  // Promotion
  let promotion = ''
  if (move.from[1].type !== move.to[1].type) {
    promotion = '=' + move.to[1].type
  }

  const takes = gameBeforeMove.board[move.to[0].toString()] === undefined ? '' : 'x'
  const pieceCode = move.from[1].type === 'P' ? (takes.length === 0 ? '' : move.from[0].toString()[0]) : move.from[1].type
  const square = move.to[0].toString()
  const check = isInCheckmate(whoseTurn(currentGame.moves), currentGame) ? '#' : (isInCheck(whoseTurn(currentGame.moves), currentGame) ? '+' : '')

  return pieceCode + disambiguation + takes + square + promotion + check
}
