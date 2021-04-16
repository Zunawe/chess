import { createPiece, Coordinates, isLegalMove } from '../../../../../../client/js/lib/chessUtils'

describe('Bishop', () => {
  let game: Game

  beforeEach(() => {
    game = {
      board: {},
      moves: []
    }
  })

  it('should allow a bishop to move normally', () => {
    game.board['d4'] = createPiece('B', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e3'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e5'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('b2'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move3, game)).toBe(true)

    const move4: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('a7'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move4, game)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    game.board['d4'] = createPiece('B', 'L')
    game.board['e5'] = createPiece('P', 'L')
    game.board['a7'] = createPiece('P', 'L')

    const move1: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('e5'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: [new Coordinates('d4'), createPiece('B', 'L')],
      to: [new Coordinates('a7'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })
})
