import * as Chess from 'chess-utils'

import { getPieceValue } from './getPieceValue'

export const calculateMaterialScore = (game: Chess.Game): number => {
  const materialForColor = (color: Chess.Color): number => {
    const board = Chess.getBoard(game)
  
    return board
      .filter((piece) => piece !== null)
      .filter((piece) => (piece as Chess.Piece).color === color)
      .reduce((acc, piece) => acc + getPieceValue((piece as Chess.Piece).type), 0)
  }

  return materialForColor('W') - materialForColor('B')
}
