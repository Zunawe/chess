import { applyMoves, createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalKingMove } from '../../../../../client/js/lib/isLegalMove'

describe('isLegalKingMove', () => {
  it('should allow the king to move normally', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')

    const move1: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move1, [], board)).toBe(true)

    const move2: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('f2'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move2, [], board)).toBe(true)

    const move3: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('d1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move3, [], board)).toBe(true)
  })

  it('should not allow the king to capture its own piece', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['e2'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(false)
  })

  it('should allow the king to capture pieces', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['e2'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('e2'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(true)
  })

  it('should allow the white king to castle kingside', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['h1'] = createPiece('R', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('g1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(true)
  })

  it('should allow the white king to castle queenside', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['a1'] = createPiece('R', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(true)
  })

  it('should allow the black king to castle kingside', () => {
    const board: Board = {}
    board['e8'] = createPiece('K', 'D')
    board['h8'] = createPiece('R', 'D')

    const move: Move = {
      from: [new Coordinates('e8'), createPiece('K', 'D')],
      to: [new Coordinates('g8'), createPiece('K', 'D')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(true)
  })

  it('should allow the black king to castle queenside', () => {
    const board: Board = {}
    board['e8'] = createPiece('K', 'D')
    board['a8'] = createPiece('R', 'D')

    const move: Move = {
      from: [new Coordinates('e8'), createPiece('K', 'D')],
      to: [new Coordinates('c8'), createPiece('K', 'D')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(true)
  })

  it('should not allow the king to castle if there is a piece blocking', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['a1'] = createPiece('R', 'L')
    board['b1'] = createPiece('N', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(false)
  })

  it('should not allow the king to castle if the king has moved', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['a1'] = createPiece('R', 'L')

    const moves: Move[] = [
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
    expect(isLegalKingMove(move, moves, board)).toBe(false)
  })

  it('should not allow the king to castle if the rook has moved', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['a1'] = createPiece('R', 'L')

    const moves: Move[] = [
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
    expect(isLegalKingMove(move, moves, board)).toBe(false)
  })

  it('should not allow the king to castle if the rook is missing', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(false)
  })

  it('should not allow the king to castle if the rook is the wrong color', () => {
    const board: Board = {}
    board['e1'] = createPiece('K', 'L')
    board['a1'] = createPiece('K', 'D')

    const move: Move = {
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    }
    expect(isLegalKingMove(move, [], board)).toBe(false)
  })
})
