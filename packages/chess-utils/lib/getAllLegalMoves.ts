import { Game, Piece, Move, whoseTurn, getBoard, getLegalMoves } from '.'

export const getAllLegalMoves = (game: Game): Move[] => {
  const turn = whoseTurn(game)

  return (getBoard(game)
    .map<[number, Piece | null]>((piece, i) => [i, piece])
    .filter(([, piece]) => piece !== null) as Array<[number, Piece]>)
    .filter(([, piece]) => piece.color === turn)
    .reduce<Move[]>((acc, [coords, piece]) => [...acc, ...getLegalMoves({ coords, piece }, game)], [])
}
