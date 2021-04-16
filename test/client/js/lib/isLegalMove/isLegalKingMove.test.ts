import { createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalMove } from '../../../../../client/js/lib/isLegalMove'

describe('King', () => {
  let game: Game

  beforeEach(() => {
    game = {
      board: {},
      moves: []
    }
  })

  it('should allow the king to move normally', () => {
    game.board['e1'] = createPiece('K', 'L')

    const move1: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('f2'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('d1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move3, game)).toBe(true)
  })

  it('should not allow the king to capture its own piece', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['e2'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow the king to capture pieces', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['e2'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the white king to castle kingside', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['h1'] = createPiece('R', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('g1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the white king to castle queenside', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['a1'] = createPiece('R', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the black king to castle kingside', () => {
    game.board['e8'] = createPiece('K', 'D')
    game.board['h8'] = createPiece('R', 'D')
    game.board['a2'] = createPiece('R', 'L')
    game.moves = [{
      from: [new Coordinates('a1'), createPiece('R', 'L')],
      to: [new Coordinates('a2'), createPiece('R', 'L')]
    }]

    const move: Move = {
      from: [new Coordinates('e8'), createPiece('K', 'D')],
      to: [new Coordinates('g8'), createPiece('K', 'D')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the black king to castle queenside', () => {
    game.board['e8'] = createPiece('K', 'D')
    game.board['a8'] = createPiece('R', 'D')
    game.board['a2'] = createPiece('R', 'L')
    game.moves = [{
      from: [new Coordinates('a1'), createPiece('R', 'L')],
      to: [new Coordinates('a2'), createPiece('R', 'L')]
    }]

    const move: Move = {
      from: [new Coordinates('e8'), createPiece('K', 'D')],
      to: [new Coordinates('c8'), createPiece('K', 'D')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow the king to castle if there is a piece blocking', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['a1'] = createPiece('R', 'L')
    game.board['b1'] = createPiece('N', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the king has moved', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['a1'] = createPiece('R', 'L')

    game.moves = [
      {
        from: [new Coordinates('e1'), createPiece('K', 'L')],
        to: [new Coordinates('e2'), createPiece('K', 'L')]
      },
      {
        from: [new Coordinates('e2'), createPiece('K', 'L')],
        to: [new Coordinates('e1'), createPiece('K', 'L')]
      }
    ]

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook has moved', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['a1'] = createPiece('R', 'L')

    game.moves = [
      {
        from: [new Coordinates('a1'), createPiece('K', 'L')],
        to: [new Coordinates('a2'), createPiece('K', 'L')]
      },
      {
        from: [new Coordinates('a2'), createPiece('K', 'L')],
        to: [new Coordinates('a1'), createPiece('K', 'L')]
      }
    ]

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook is missing', () => {
    game.board['e1'] = createPiece('K', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook is the wrong color', () => {
    game.board['e1'] = createPiece('K', 'L')
    game.board['a1'] = createPiece('K', 'D')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })
})
