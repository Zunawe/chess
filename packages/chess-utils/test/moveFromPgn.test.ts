import { moveFromPgn, Game, createPiece, decodeCoords } from '../lib'
import { createGame } from '../lib/createGame'

describe('moveFromPgn', () => {
  it('should decode a pawn moving forward', () => {
    const game: Game = createGame()
    expect(moveFromPgn('a4', game)).toStrictEqual({
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
      to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
    })
    expect(moveFromPgn('a3', game)).toStrictEqual({
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
    })
  })

  it('should decode a rook move', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') }
      }
    ])
    expect(moveFromPgn('Ra3', game)).toStrictEqual({
      from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
      to: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') }
    })
  })

  it('should decode checkmate', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('f2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('f3'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('e7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('e6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('g2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('g4'), piece: createPiece('P', 'L') }
      },
    ])
    expect(moveFromPgn('Qh4#', game)).toStrictEqual({
      from: { coords: decodeCoords('d8'), piece: createPiece('Q', 'D') },
      to: { coords: decodeCoords('h4'), piece: createPiece('Q', 'D') }
    })
  })

  it('should decode ambiguous game', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('h2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('h4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('h1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('h3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coords: decodeCoords('d4'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d3'), piece: createPiece('P', 'D') }
      },
    ])
    expect(moveFromPgn('Raxd3', game)).toStrictEqual({
      from: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') },
      to: { coords: decodeCoords('d3'), piece: createPiece('R', 'L') }
    })
  })

  it('should throw an error when move is not disambiguated', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('h2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('h4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('h1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('h3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coords: decodeCoords('d4'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d3'), piece: createPiece('P', 'D') }
      },
    ])
    expect(() => moveFromPgn('Rxd3', game)).toThrowError('Could not disambiguate between multiple valid pieces')
  })

  it('should decode a queenside castle', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('d2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('d4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('d1'), piece: createPiece('Q', 'L') },
        to: { coords: decodeCoords('d3'), piece: createPiece('Q', 'L') }
      },
      {
        from: { coords: decodeCoords('d6'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('c1'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('d2'), piece: createPiece('B', 'L') }
      },
      {
        from: { coords: decodeCoords('e7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('e6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'L') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'L') }
      },
      {
        from: { coords: decodeCoords('e6'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('e5'), piece: createPiece('P', 'D') }
      },
    ])
    expect(moveFromPgn('O-O-O', game)).toStrictEqual({
      from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
      to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
    })
  })
})
