import { encodeMove, Game, createPiece, decodeCoords } from '../lib'
import { createGame } from '../lib/createGame'

describe('encodeMove', () => {
  let game: Game

  beforeEach(() => {
    game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('d7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coords: decodeCoords('d8'), piece: createPiece('Q', 'D') },
        to: { coords: decodeCoords('d6'), piece: createPiece('Q', 'D') }
      },
      {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'L') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'L') }
      },
      {
        from: { coords: decodeCoords('c8'), piece: createPiece('B', 'D') },
        to: { coords: decodeCoords('g4'), piece: createPiece('B', 'D') }
      },
      {
        from: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('b8'), piece: createPiece('N', 'D') },
        to: { coords: decodeCoords('c6'), piece: createPiece('N', 'D') }
      },
      {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a6'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'D') },
        to: { coords: decodeCoords('c8'), piece: createPiece('K', 'D') }
      },
      {
        from: { coords: decodeCoords('a6'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('b7'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('c8'), piece: createPiece('K', 'D') },
        to: { coords: decodeCoords('b8'), piece: createPiece('K', 'D') }
      },
      {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('b3'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('g4'), piece: createPiece('B', 'D') },
        to: { coords: decodeCoords('c8'), piece: createPiece('B', 'D') }
      },
      {
        from: { coords: decodeCoords('b7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('c8'), piece: createPiece('Q', 'L') }
      },
    ])
  })

  describe('Regular Moves', () => {
    it('should encode a pawn moving forward', () => {
      expect(encodeMove(0, game)).toBe('a4')
    })

    it('should encode a rook move', () => {
      expect(encodeMove(2, game)).toBe('Ra3')
    })

    it('should encode a queen move', () => {
      expect(encodeMove(3, game)).toBe('Qd6')
    })

    it('should encode a knight move', () => {
      expect(encodeMove(4, game)).toBe('Nc3')
    })

    it('should encode a bishop move', () => {
      expect(encodeMove(5, game)).toBe('Bg4')
    })
  })

  describe('Castling', () => {
    it('should encode a queenside castle', () => {
      expect(encodeMove(9, game)).toBe('O-O-O')
    })
  })

  describe('Check', () => {
    it('should encode checking the king', () => {
      expect(encodeMove(10, game)).toBe('axb7+')
    })
  })

  describe('Pawn Promotion', () => {
    it('should encode promotion to queen', () => {
      expect(encodeMove(14, game)).toBe('bxc8=Q+')
    })
  })

  describe('Ambiguous Moves', () => {
    it('should encode ambiguous game', () => {
      game = createGame([
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
        {
          from: { coords: decodeCoords('a3'), piece: createPiece('R', 'L') },
          to: { coords: decodeCoords('d3'), piece: createPiece('R', 'L') }
        }
      ])
      expect(encodeMove(8, game)).toBe('Raxd3')
    })
  })
})
