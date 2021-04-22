export type Color = 'W' | 'B'
export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'

export interface Piece {
  color: Color
  type: PieceType
}

export type Board = Array<Piece | null>

export interface MovePart {
  coords: number
  piece: Piece
}

export interface Move {
  from: MovePart
  to: MovePart
}

export interface Game {
  moves: Move[]
  initialBoard: Board
}
