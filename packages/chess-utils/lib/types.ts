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

export interface Move {
  from: [Coordinates, Piece]
  to: [Coordinates, Piece]
}

export interface Game {
  board: Board
  moves: Move[]
}
