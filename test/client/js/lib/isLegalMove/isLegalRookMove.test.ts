import { createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalRookMove } from '../../../../../client/js/lib/isLegalMove'

describe('isLegalRookMove', () => {
  it('should allow a bishop to move normally', () => {
    const board: Board = {}
    board['d4'] = createPiece('R', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('e4'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move1, board)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d1'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move2, board)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('b4'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move3, board)).toBe(true)

    const move4: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d8'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move4, board)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    const board: Board = {}
    board['d4'] = createPiece('R', 'L')
    board['d3'] = createPiece('P', 'L')
    board['f4'] = createPiece('P', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d3'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move1, board)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('f4'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move2, board)).toBe(false)
  })

  it('should not allow a bishop to move past pieces', () => {
    const board: Board = {}
    board['d4'] = createPiece('R', 'L')
    board['d3'] = createPiece('P', 'L')
    board['f4'] = createPiece('P', 'D')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d1'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move1, board)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('h4'), createPiece('R', 'L')]
    }
    expect(isLegalRookMove(move2, board)).toBe(false)
  })
})
