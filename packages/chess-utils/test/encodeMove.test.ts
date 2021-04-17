import { encodeMove, Coordinates, Move, createPiece } from '../lib'

describe('encodeMove', () => {
  let moves: Move[]

  beforeEach(() => {
    moves = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('d7'), createPiece('P', 'D')],
        to: [new Coordinates('d5'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('a1'), createPiece('R', 'L')],
        to: [new Coordinates('a3'), createPiece('R', 'L')]
      },
      {
        from: [new Coordinates('d8'), createPiece('Q', 'D')],
        to: [new Coordinates('d6'), createPiece('Q', 'D')]
      },
      {
        from: [new Coordinates('b1'), createPiece('N', 'L')],
        to: [new Coordinates('c3'), createPiece('N', 'L')]
      },
      {
        from: [new Coordinates('c8'), createPiece('B', 'D')],
        to: [new Coordinates('g4'), createPiece('B', 'D')]
      },
      {
        from: [new Coordinates('a4'), createPiece('P', 'L')],
        to: [new Coordinates('a5'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('b8'), createPiece('N', 'D')],
        to: [new Coordinates('c6'), createPiece('N', 'D')]
      },
      {
        from: [new Coordinates('a5'), createPiece('P', 'L')],
        to: [new Coordinates('a6'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('e8'), createPiece('K', 'D')],
        to: [new Coordinates('c8'), createPiece('K', 'D')]
      },
      {
        from: [new Coordinates('a6'), createPiece('P', 'L')],
        to: [new Coordinates('b7'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('c8'), createPiece('K', 'D')],
        to: [new Coordinates('b8'), createPiece('K', 'D')]
      },
      {
        from: [new Coordinates('b2'), createPiece('P', 'L')],
        to: [new Coordinates('b3'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('g4'), createPiece('B', 'D')],
        to: [new Coordinates('c8'), createPiece('B', 'D')]
      },
      {
        from: [new Coordinates('b7'), createPiece('P', 'L')],
        to: [new Coordinates('c8'), createPiece('Q', 'L')]
      },
    ]
  })
  describe('Regular Moves', () => {
    it('should encode a pawn moving forward', () => {
      expect(encodeMove(0, moves)).toBe('a4')
    })

    it('should encode a rook move', () => {
      expect(encodeMove(2, moves)).toBe('Ra3')
    })

    it('should encode a queen move', () => {
      expect(encodeMove(3, moves)).toBe('Qd6')
    })

    it('should encode a knight move', () => {
      expect(encodeMove(4, moves)).toBe('Nc3')
    })

    it('should encode a bishop move', () => {
      expect(encodeMove(5, moves)).toBe('Bg4')
    })
  })

  describe('Castling', () => {
    it('should encode a queenside castle', () => {
      expect(encodeMove(9, moves)).toBe('0-0-0')
    })
  })

  describe('Check', () => {
    it('should encode checking the king', () => {
      expect(encodeMove(10, moves)).toBe('axb7+')
    })
  })

  describe('Pawn Promotion', () => {
    it('should encode promotion to queen', () => {
      expect(encodeMove(14, moves)).toBe('bxc8=Q+')
    })
  })
})
