import { Game, isCastle, getLegalMoves, Coordinates, getBoard } from '.'
import { isInCheck } from './isInCheck'
import { isInCheckmate } from './isInCheckmate'
import { whoseTurn } from './whoseTurn'
import { coordinatesEqual } from './Coordinates'
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
    return move.to.coordinates.file === 6 ? 'O-O' : 'O-O-O'
  }

  // En Passant
  // let enPassant = ''
  // if (Object.entries(gameBeforeMove.board).length < Object.entries(currentGame.board).length &&
  //   gameBeforeMove.board[move.to.coordinates.toString()] === undefined) {
  //     enPassant = 'e.p.'
  //   }

  // Disambiguation
  const otherPieceLocations = Object.entries(boardBeforeMove)
    .filter(([c, p]) => {
      return c !== move.from.coordinates.toString() && p.color === move.from.piece.color && p.type === move.from.piece.type
    })
    .filter(([c, p]) => {
      return getLegalMoves({ coordinates: new Coordinates(c), piece: p }, gameBeforeMove)
        .some((legalMove) => {
          return coordinatesEqual(legalMove.to.coordinates, move.to.coordinates) && piecesEqual(legalMove.to.piece, move.to.piece)
        })
    })
    .map(([c]) => new Coordinates(c))

  let disambiguation = ''
  if (otherPieceLocations.length > 0) {
    if (otherPieceLocations.every(({ file }) => file !== move.from.coordinates.file)) {
      disambiguation = move.from.coordinates.toString()[0]
    } else if (otherPieceLocations.every(({ rank }) => rank !== move.from.coordinates.rank)) {
      disambiguation = move.from.coordinates.toString()[1]
    } else {
      // Incredibly uncommon, but technically possible
      disambiguation = move.from.coordinates.toString()
    }
  }

  // Promotion
  let promotion = ''
  if (move.from.piece.type !== move.to.piece.type) {
    promotion = '=' + move.to.piece.type
  }

  const takes = boardBeforeMove[move.to.coordinates.toString()] === undefined ? '' : 'x'
  const pieceCode = move.from.piece.type === 'P' ? (takes.length === 0 ? '' : move.from.coordinates.toString()[0]) : move.from.piece.type
  const square = move.to.coordinates.toString()
  const check = isInCheckmate(whoseTurn(currentGame), currentGame) ? '#' : (isInCheck(whoseTurn(currentGame), currentGame) ? '+' : '')

  return pieceCode + disambiguation + takes + square + promotion + check
}
