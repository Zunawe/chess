import { Board } from '.'

export const serializeBoard = (board: Board): string => {
  return board.reduce((acc, piece, i) => acc + ':' + (piece === null ? '' : piece.color + piece.type), '').substring(1)
}
