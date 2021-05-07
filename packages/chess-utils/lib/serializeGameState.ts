import { Game, castleAvailable, Piece, getRank, getFile, encodeFile } from '.'
import { getBoard } from './getBoard'
import { serializeBoard } from './serializeBoard'

export const serializeGameState = (game: Game): string => {
  const board = getBoard(game)

  const whiteKingCoords = board.findIndex((piece) => piece !== null && piece.type === 'K' && piece.color === 'W')
  const blackKingCoords = board.findIndex((piece) => piece !== null && piece.type === 'K' && piece.color === 'B')

  const whiteRookQ = board[0]
  const whiteRookK = board[7]
  const blackRookQ = board[56]
  const blackRookK = board[63]

  const lastMove = game.moves[game.moves.length - 1]

  return serializeBoard(board) +
    '|' +
    (whiteRookQ === null
      ? '-'
      : castleAvailable(game, { coords: whiteKingCoords, piece: board[whiteKingCoords] as Piece }, { coords: 0, piece: whiteRookQ })
        ? '+'
        : '-') +
    (whiteRookK === null
      ? '-'
      : castleAvailable(game, { coords: whiteKingCoords, piece: board[whiteKingCoords] as Piece }, { coords: 0, piece: whiteRookK })
        ? '+'
        : '-') +
    (blackRookQ === null
      ? '-'
      : castleAvailable(game, { coords: blackKingCoords, piece: board[blackKingCoords] as Piece }, { coords: 0, piece: blackRookQ })
        ? '+'
        : '-') +
    (blackRookK === null
      ? '-'
      : castleAvailable(game, { coords: blackKingCoords, piece: board[blackKingCoords] as Piece }, { coords: 0, piece: blackRookK })
        ? '+'
        : '-') +
    (lastMove !== undefined && lastMove.from.piece.type === 'P' && Math.abs(getRank(lastMove.to.coords) - getRank(lastMove.from.coords)) === 2
      ? encodeFile(getFile(lastMove.from.coords))
      : '-')
}
