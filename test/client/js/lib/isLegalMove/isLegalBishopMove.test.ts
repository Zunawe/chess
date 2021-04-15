import { createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalMove } from '../../../../../client/js/lib/isLegalMove'

describe('Bishop', () => {
  it('should allow a bishop to move normally', () => {
    const board: Board = {}
    board['d4'] = createPiece('B', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e3'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move1, [], board)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e5'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move2, [], board)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('b2'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move3, [], board)).toBe(true)

    const move4: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('a7'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move4, [], board)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    const board: Board = {}
    board['d4'] = createPiece('B', 'L')
    board['e5'] = createPiece('P', 'L')
    board['a7'] = createPiece('P', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e5'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move1, [], board)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('a7'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move2, [], board)).toBe(false)
  })
})
