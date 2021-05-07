import { Board, PieceType, Color, getEmptyBoard } from '.'

export const deserializeBoard = (serializedBoard: string): Board => {
  return serializedBoard.split(':').reduce<Board>((acc, serializedPiece, i) => {
    if (serializedPiece !== '') {
      acc[i] = {
        color: serializedPiece[0] as Color,
        type: serializedPiece[1] as PieceType
      }
    }

    return acc
  }, getEmptyBoard())
}
