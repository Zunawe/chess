import { moveFromPgn, Game, createPiece, decodeCoords } from '../lib'
import { createGame } from '../lib/createGame'

describe('moveFromPgn', () => {
  it('should decode a pawn moving forward', () => {
    const game: Game = createGame()
    expect(moveFromPgn('a4', game)).toStrictEqual({
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
      to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
    })
    expect(moveFromPgn('a3', game)).toStrictEqual({
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
    })
  })

  it('should decode a rook move', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') }
      }
    ])
    expect(moveFromPgn('Ra3', game)).toStrictEqual({
      from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
      to: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') }
    })
  })

  it('should decode checkmate', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('f2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('f3'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('e7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('e6'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('g2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('g4'), piece: createPiece('P', 'W') }
      },
    ])
    expect(moveFromPgn('Qh4#', game)).toStrictEqual({
      from: { coords: decodeCoords('d8'), piece: createPiece('Q', 'B') },
      to: { coords: decodeCoords('h4'), piece: createPiece('Q', 'B') }
    })
  })

  it('should decode ambiguous game', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('h2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('h4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('h1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('h3'), piece: createPiece('R', 'W') }
      },
      {
        from: { coords: decodeCoords('d4'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d3'), piece: createPiece('P', 'B') }
      },
    ])
    expect(moveFromPgn('Raxd3', game)).toStrictEqual({
      from: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') },
      to: { coords: decodeCoords('d3'), piece: createPiece('R', 'W') }
    })
  })

  it('should throw an error when move is not disambiguated', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('h2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('h4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('h1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('h3'), piece: createPiece('R', 'W') }
      },
      {
        from: { coords: decodeCoords('d4'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d3'), piece: createPiece('P', 'B') }
      },
    ])
    expect(() => moveFromPgn('Rxd3', game)).toThrowError('Could not disambiguate between multiple valid pieces')
  })

  it('should decode a queenside castle', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('d2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('d1'), piece: createPiece('Q', 'W') },
        to: { coords: decodeCoords('d3'), piece: createPiece('Q', 'W') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('c1'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('d2'), piece: createPiece('B', 'W') }
      },
      {
        from: { coords: decodeCoords('e7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('e6'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'W') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'W') }
      },
      {
        from: { coords: decodeCoords('e6'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('e5'), piece: createPiece('P', 'B') }
      },
    ])
    expect(moveFromPgn('O-O-O', game)).toStrictEqual({
      from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
      to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
    })
  })
})
