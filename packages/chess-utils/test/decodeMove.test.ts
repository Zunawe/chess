import { decodeMove, Coordinates, Game, createPiece, getStartingBoard } from '../lib'
import { createGame } from '../lib/createGame'

describe('decodeMove', () => {
  it('should decode a pawn moving forward', () => {
    const game: Game = createGame()
    expect(decodeMove('a4', game)).toStrictEqual({
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
    })
    expect(decodeMove('a3', game)).toStrictEqual({
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') }
    })
  })

  it('should decode a rook move', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') }
      }
    ])
    expect(decodeMove('Ra3', game)).toStrictEqual({
      from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') }
    })
  })

  it('should decode checkmate', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('f2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('f3'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('e7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('e6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('g2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('g4'), piece: createPiece('P', 'L') }
      },
    ])
    expect(decodeMove('Qh4#', game)).toStrictEqual({
      from: { coordinates: new Coordinates('d8'), piece: createPiece('Q', 'D') },
      to: { coordinates: new Coordinates('h4'), piece: createPiece('Q', 'D') }
    })
  })

  it('should decode ambiguous game', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
        to: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('h2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('h4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d4'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('h1'), piece: createPiece('R', 'L') },
        to: { coordinates: new Coordinates('h3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d4'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d3'), piece: createPiece('P', 'D') }
      },
    ])
    expect(decodeMove('Raxd3', game)).toStrictEqual({
      from: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('d3'), piece: createPiece('R', 'L') }
    })
  })

  it('should throw an error when move is not disambiguated', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
        to: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('h2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('h4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d4'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('h1'), piece: createPiece('R', 'L') },
        to: { coordinates: new Coordinates('h3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d4'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d3'), piece: createPiece('P', 'D') }
      },
    ])
    expect(() => decodeMove('Rxd3', game)).toThrowError('Could not disambiguate between multiple valid pieces')
  })

  it('should decode a queenside castle', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('d2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('d4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('d1'), piece: createPiece('Q', 'L') },
        to: { coordinates: new Coordinates('d3'), piece: createPiece('Q', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d6'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('c1'), piece: createPiece('B', 'L') },
        to: { coordinates: new Coordinates('d2'), piece: createPiece('B', 'L') }
      },
      {
        from: { coordinates: new Coordinates('e7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('e6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('b1'), piece: createPiece('N', 'L') },
        to: { coordinates: new Coordinates('c3'), piece: createPiece('N', 'L') }
      },
      {
        from: { coordinates: new Coordinates('e6'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('e5'), piece: createPiece('P', 'D') }
      },
    ])
    expect(decodeMove('O-O-O', game)).toStrictEqual({
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    })
  })
})
