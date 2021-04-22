import { moveToPgn, Game, createPiece, decodeCoords } from '../lib'
import { createGame } from '../lib/createGame'

describe('moveToPgn', () => {
  let game: Game

  beforeEach(() => {
    game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'B') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') }
      },
      {
        from: { coords: decodeCoords('d8'), piece: createPiece('Q', 'B') },
        to: { coords: decodeCoords('d6'), piece: createPiece('Q', 'B') }
      },
      {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'W') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'W') }
      },
      {
        from: { coords: decodeCoords('c8'), piece: createPiece('B', 'B') },
        to: { coords: decodeCoords('g4'), piece: createPiece('B', 'B') }
      },
      {
        from: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('b8'), piece: createPiece('N', 'B') },
        to: { coords: decodeCoords('c6'), piece: createPiece('N', 'B') }
      },
      {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a6'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'B') },
        to: { coords: decodeCoords('c8'), piece: createPiece('K', 'B') }
      },
      {
        from: { coords: decodeCoords('a6'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('b7'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('c8'), piece: createPiece('K', 'B') },
        to: { coords: decodeCoords('b8'), piece: createPiece('K', 'B') }
      },
      {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('b3'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('g4'), piece: createPiece('B', 'B') },
        to: { coords: decodeCoords('c8'), piece: createPiece('B', 'B') }
      },
      {
        from: { coords: decodeCoords('b7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('c8'), piece: createPiece('Q', 'W') }
      },
    ])
  })

  describe('Regular Moves', () => {
    it('should encode a pawn moving forward', () => {
      expect(moveToPgn(0, game)).toBe('a4')
    })

    it('should encode a rook move', () => {
      expect(moveToPgn(2, game)).toBe('Ra3')
    })

    it('should encode a queen move', () => {
      expect(moveToPgn(3, game)).toBe('Qd6')
    })

    it('should encode a knight move', () => {
      expect(moveToPgn(4, game)).toBe('Nc3')
    })

    it('should encode a bishop move', () => {
      expect(moveToPgn(5, game)).toBe('Bg4')
    })
  })

  describe('Castling', () => {
    it('should encode a queenside castle', () => {
      expect(moveToPgn(9, game)).toBe('O-O-O')
    })
  })

  describe('Check', () => {
    it('should encode checking the king', () => {
      expect(moveToPgn(10, game)).toBe('axb7+')
    })
  })

  describe('Pawn Promotion', () => {
    it('should encode promotion to queen', () => {
      expect(moveToPgn(14, game)).toBe('bxc8=Q+')
    })
  })

  describe('Ambiguous Moves', () => {
    it('should encode ambiguous game', () => {
      game = createGame([
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
        {
          from: { coords: decodeCoords('a3'), piece: createPiece('R', 'W') },
          to: { coords: decodeCoords('d3'), piece: createPiece('R', 'W') }
        }
      ])
      expect(moveToPgn(8, game)).toBe('Raxd3')
    })
  })
})
