import { encodeMove, Coordinates, Game, createPiece, getStartingBoard } from '../lib'
import { createGame } from '../lib/createGame'

describe('encodeMove', () => {
  let game: Game

  beforeEach(() => {
    game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('d5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
        to: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') }
      },
      {
        from: { coordinates: new Coordinates('d8'), piece: createPiece('Q', 'D') },
        to: { coordinates: new Coordinates('d6'), piece: createPiece('Q', 'D') }
      },
      {
        from: { coordinates: new Coordinates('b1'), piece: createPiece('N', 'L') },
        to: { coordinates: new Coordinates('c3'), piece: createPiece('N', 'L') }
      },
      {
        from: { coordinates: new Coordinates('c8'), piece: createPiece('B', 'D') },
        to: { coordinates: new Coordinates('g4'), piece: createPiece('B', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('b8'), piece: createPiece('N', 'D') },
        to: { coordinates: new Coordinates('c6'), piece: createPiece('N', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a6'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('e8'), piece: createPiece('K', 'D') },
        to: { coordinates: new Coordinates('c8'), piece: createPiece('K', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a6'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('b7'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('c8'), piece: createPiece('K', 'D') },
        to: { coordinates: new Coordinates('b8'), piece: createPiece('K', 'D') }
      },
      {
        from: { coordinates: new Coordinates('b2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('b3'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('g4'), piece: createPiece('B', 'D') },
        to: { coordinates: new Coordinates('c8'), piece: createPiece('B', 'D') }
      },
      {
        from: { coordinates: new Coordinates('b7'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('c8'), piece: createPiece('Q', 'L') }
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
        {
          from: { coordinates: new Coordinates('a3'), piece: createPiece('R', 'L') },
          to: { coordinates: new Coordinates('d3'), piece: createPiece('R', 'L') }
        }
      ])
      expect(encodeMove(8, game)).toBe('Raxd3')
    })
  })
})
