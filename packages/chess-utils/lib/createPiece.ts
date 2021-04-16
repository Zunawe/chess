import { PieceType, Color, Piece } from './index'

export const createPiece = (type: PieceType, color: Color): Piece => ({ type, color })
