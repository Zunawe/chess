import { Coordinates } from './index'

export type Color = 'D' | 'L'
export type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'

export interface Piece {
  color: Color
  type: PieceType
}

export interface Board {
  [key: string]: Piece
}

export interface MovePart {
  coordinates: Coordinates
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
