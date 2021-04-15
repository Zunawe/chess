import { getStartingBoard, createPiece } from '../../../../../client/js/lib/util'
import { isLegalKnightMove } from '../../../../../client/js/lib/isLegalMove'

describe('isLegalKnightMove', () => {
  let board: Piece[]
  let piece: Piece

  beforeEach(() => {
    board = getStartingBoard()
    piece = createPiece('N', 'L', 0, 1)
  })

  it('should allow a knight to move normally', () => {
    const move: Move = {
      piece,
      to: { rank: 2, file: 2 }
    }
    expect(isLegalKnightMove(move, board)).toBe(true)
  })

  it('should not allow a knight to land on its own piece', () => {
    const move: Move = {
      piece,
      to: { rank: 1, file: 3 }
    }
    expect(isLegalKnightMove(move, board)).toBe(false)
  })

  it('should allow a knight to capture', () => {
    const board = [
      piece = createPiece('N', 'L', 3, 3),
      piece = createPiece('P', 'D', 5, 4)
    ]

    const move: Move = {
      piece: createPiece('P', 'L', 3, 3),
      to: { rank: 5, file: 4 }
    }
    expect(isLegalKnightMove(move, board)).toBe(true)
  })
})
