import { Game, MovePart, getFile, getRank, piecesEqual } from '.'

export const castleAvailable = (game: Game, king: MovePart, rook: MovePart): boolean => {
  if (
    king.piece.color !== rook.piece.color ||
    king.piece.type !== 'K' ||
    rook.piece.type !== 'R' ||
    getFile(king.coords) !== 4 ||
    getRank(king.coords) !== (king.piece.color === 'W' ? 0 : 7) ||
    (getFile(rook.coords) !== 0 && getFile(rook.coords) !== 7) ||
    (getRank(rook.coords) !== 0 && getRank(rook.coords) !== 7)
  ) {
    return false
  }

  // King and rook must have never moved
  for (let i = 0; i < game.moves.length; ++i) {
    // King moved
    if (piecesEqual(game.moves[i].from.piece, king.piece)) {
      return false
    }
    // Rook moved
    if (piecesEqual(game.moves[i].from.piece, rook.piece) && game.moves[i].from.coords === rook.coords) {
      return false
    }
  }

  return true
}
