import { createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalMove } from '../../../../../client/js/lib/isLegalMove'

describe('Rook', () => {
  let game: Game

  beforeEach(() => {
    game = {
      board: {},
      moves: []
    }
  })

  it('should allow a bishop to move normally', () => {
    game.board = {}
    game.board['d4'] = createPiece('R', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('e4'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d1'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('b4'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move3, game)).toBe(true)

    const move4: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d8'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move4, game)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    game.board['d4'] = createPiece('R', 'L')
    game.board['d3'] = createPiece('P', 'L')
    game.board['f4'] = createPiece('P', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d3'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('f4'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })

  it('should not allow a bishop to move past pieces', () => {
    game.board['d4'] = createPiece('R', 'L')
    game.board['d3'] = createPiece('P', 'L')
    game.board['f4'] = createPiece('P', 'D')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('d1'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('R', 'L')],
      to: [new Coordinates('h4'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })
})
