import { getStartingBoard, createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalMove } from '../../../../../client/js/lib/isLegalMove'

describe('Knight', () => {
  let board: Board

  beforeEach(() => {
    board = getStartingBoard()
  })

  it('should allow a knight to move normally', () => {
    const move: Move = {
      from: [new Coordinates('b1'), createPiece('N', 'L')],
      to: [new Coordinates('c3'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should not allow a knight to land on its own piece', () => {
    const move: Move = {
      from: [new Coordinates('b1'), createPiece('N', 'L')],
      to: [new Coordinates('d2'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should allow a knight to capture', () => {
    const board: Board = {}
    board['d4'] = createPiece('N', 'L')
    board['e6'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('d4'), createPiece('N', 'L')],
      to: [new Coordinates('e6'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })
})
