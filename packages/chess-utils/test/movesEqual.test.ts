import { createPiece, decodeCoords, movesEqual, Move } from '../lib'

describe('movesEqual', () => {
  let a: Move, b: Move

  beforeEach(() => {
    a = {
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
    }
    b = {
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
    }
  })

  it('should find a move equal to itself', () => {
    expect(movesEqual(a, a)).toBe(true)
    expect(movesEqual(a, b)).toBe(true)
  })

  it('should find different piece types to be different', () => {
    b.from.piece.type = 'Q'
    b.to.piece.type = 'Q'
    expect(movesEqual(a, b)).toBe(false)
  })

  it('should find different colored pieces to be different', () => {
    b.from.piece.color = 'D'
    b.to.piece.color = 'D'
    expect(movesEqual(a, b)).toBe(false)
  })

  it('should find different positions to be different', () => {
    b.from.coords = 0
    b.to.coords = 1
    expect(movesEqual(a, b)).toBe(false)
  })
})
