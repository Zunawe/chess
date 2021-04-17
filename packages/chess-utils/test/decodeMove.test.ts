import { decodeMove, Coordinates, Move, createPiece } from '../lib'

describe('decodeMove', () => {
  it('should decode a pawn moving forward', () => {
    expect(decodeMove('a4', [])).toStrictEqual({
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    })
    expect(decodeMove('a3', [])).toStrictEqual({
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    })
  })

  it('should decode a rook move', () => {
    const moves: Move[] = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d7'), createPiece('P', 'D')],
        to: [new Coordinates('d5'), createPiece('P', 'D')]
      }
    ]
    expect(decodeMove('Ra3', moves)).toStrictEqual({
      from: [new Coordinates('a1'), createPiece('R', 'L')],
      to: [new Coordinates('a3'), createPiece('R', 'L')]
    })
  })

  it('should decode checkmate', () => {
    const moves: Move[] = [
      {
        from: [new Coordinates('f2'), createPiece('P', 'L')],
        to: [new Coordinates('f3'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('e7'), createPiece('P', 'D')],
        to: [new Coordinates('e6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('g2'), createPiece('P', 'L')],
        to: [new Coordinates('g4'), createPiece('P', 'L')]
      },
    ]
    expect(decodeMove('Qh4#', moves)).toStrictEqual({
      from: [new Coordinates('d8'), createPiece('Q', 'D')],
      to: [new Coordinates('h4'), createPiece('Q', 'D')]
    })
  })

  it('should decode ambiguous moves', () => {
    const moves: Move[] = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d7'), createPiece('P', 'D')],
        to: [new Coordinates('d6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('a1'), createPiece('R', 'L')],
        to: [new Coordinates('a3'), createPiece('R', 'L')]
      },
      {
        from: [new Coordinates('d6'), createPiece('P', 'D')],
        to: [new Coordinates('d5'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('h2'), createPiece('P', 'L')],
        to: [new Coordinates('h4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d5'), createPiece('P', 'D')],
        to: [new Coordinates('d4'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('h1'), createPiece('R', 'L')],
        to: [new Coordinates('h3'), createPiece('R', 'L')]
      },
      {
        from: [new Coordinates('d4'), createPiece('P', 'D')],
        to: [new Coordinates('d3'), createPiece('P', 'D')]
      },
    ]
    expect(decodeMove('Raxd3', moves)).toStrictEqual({
      from: [new Coordinates('a3'), createPiece('R', 'L')],
      to: [new Coordinates('d3'), createPiece('R', 'L')]
    })
  })

  it('should throw an error when move is not disambiguated', () => {
    const moves: Move[] = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d7'), createPiece('P', 'D')],
        to: [new Coordinates('d6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('a1'), createPiece('R', 'L')],
        to: [new Coordinates('a3'), createPiece('R', 'L')]
      },
      {
        from: [new Coordinates('d6'), createPiece('P', 'D')],
        to: [new Coordinates('d5'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('h2'), createPiece('P', 'L')],
        to: [new Coordinates('h4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d5'), createPiece('P', 'D')],
        to: [new Coordinates('d4'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('h1'), createPiece('R', 'L')],
        to: [new Coordinates('h3'), createPiece('R', 'L')]
      },
      {
        from: [new Coordinates('d4'), createPiece('P', 'D')],
        to: [new Coordinates('d3'), createPiece('P', 'D')]
      },
    ]
    expect(() => decodeMove('Rxd3', moves)).toThrowError('Could not disambiguate between multiple valid pieces')
  })

  it('should decode a queenside castle', () => {
    const moves: Move[] = [
      {
        from: [new Coordinates('d2'), createPiece('P', 'L')],
        to: [new Coordinates('d4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d7'), createPiece('P', 'D')],
        to: [new Coordinates('d6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('d1'), createPiece('Q', 'L')],
        to: [new Coordinates('d3'), createPiece('Q', 'L')]
      },
      {
        from: [new Coordinates('d6'), createPiece('P', 'D')],
        to: [new Coordinates('d5'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('c1'), createPiece('B', 'L')],
        to: [new Coordinates('d2'), createPiece('B', 'L')]
      },
      {
        from: [new Coordinates('e7'), createPiece('P', 'D')],
        to: [new Coordinates('e6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('b1'), createPiece('N', 'L')],
        to: [new Coordinates('c3'), createPiece('N', 'L')]
      },
      {
        from: [new Coordinates('e6'), createPiece('P', 'D')],
        to: [new Coordinates('e5'), createPiece('P', 'D')]
      },
    ]
    expect(decodeMove('O-O-O', moves)).toStrictEqual({
      from: [new Coordinates('e1'), createPiece('K', 'L')],
      to: [new Coordinates('c1'), createPiece('K', 'L')]
    })
  })
})
