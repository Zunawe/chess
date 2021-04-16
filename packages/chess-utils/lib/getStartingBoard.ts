import { Coordinates, createPiece, Board, Piece } from './index'

export const getStartingBoard = (): Board => {
  const data: Array<[Coordinates, Piece]> = [
    [new Coordinates(0, 1), createPiece('P', 'L')],
    [new Coordinates(1, 1), createPiece('P', 'L')],
    [new Coordinates(2, 1), createPiece('P', 'L')],
    [new Coordinates(3, 1), createPiece('P', 'L')],
    [new Coordinates(4, 1), createPiece('P', 'L')],
    [new Coordinates(5, 1), createPiece('P', 'L')],
    [new Coordinates(6, 1), createPiece('P', 'L')],
    [new Coordinates(7, 1), createPiece('P', 'L')],
    [new Coordinates(0, 0), createPiece('R', 'L')],
    [new Coordinates(1, 0), createPiece('N', 'L')],
    [new Coordinates(2, 0), createPiece('B', 'L')],
    [new Coordinates(3, 0), createPiece('Q', 'L')],
    [new Coordinates(4, 0), createPiece('K', 'L')],
    [new Coordinates(5, 0), createPiece('B', 'L')],
    [new Coordinates(6, 0), createPiece('N', 'L')],
    [new Coordinates(7, 0), createPiece('R', 'L')],
    [new Coordinates(0, 6), createPiece('P', 'D')],
    [new Coordinates(1, 6), createPiece('P', 'D')],
    [new Coordinates(2, 6), createPiece('P', 'D')],
    [new Coordinates(3, 6), createPiece('P', 'D')],
    [new Coordinates(4, 6), createPiece('P', 'D')],
    [new Coordinates(5, 6), createPiece('P', 'D')],
    [new Coordinates(6, 6), createPiece('P', 'D')],
    [new Coordinates(7, 6), createPiece('P', 'D')],
    [new Coordinates(0, 7), createPiece('R', 'D')],
    [new Coordinates(1, 7), createPiece('N', 'D')],
    [new Coordinates(2, 7), createPiece('B', 'D')],
    [new Coordinates(3, 7), createPiece('Q', 'D')],
    [new Coordinates(4, 7), createPiece('K', 'D')],
    [new Coordinates(5, 7), createPiece('B', 'D')],
    [new Coordinates(6, 7), createPiece('N', 'D')],
    [new Coordinates(7, 7), createPiece('R', 'D')]
  ]

  return data.reduce<Board>((board, [coordinates, piece]) => {
    board[coordinates.toString()] = piece
    return board
  }, {})
}
