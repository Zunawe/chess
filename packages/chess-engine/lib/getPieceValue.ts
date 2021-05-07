import * as Chess from 'chess-utils'

const VALUES = {
  P: 1,
  N: 3,
  B: 3,
  R: 5,
  Q: 9,
  K: 10000
}

export const getPieceValue = (piece: Chess.PieceType): number => {
  return VALUES[piece]
}
