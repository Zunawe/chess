import { piecesEqual, Piece } from '../lib'

describe('piecesEqual', () => {
  let a: Piece, b: Piece

  beforeEach(() => {
    a = {
      type: 'P',
      color: 'W'
    }
    b = {
      type: 'P',
      color: 'W'
    }
  })

  it('should find a piece equal to itself', () => {
    expect(piecesEqual(a, a)).toBe(true)
    expect(piecesEqual(a, b)).toBe(true)
  })

  it('should find different piece types to be different', () => {
    b.type = 'Q'
    expect(piecesEqual(a, b)).toBe(false)
  })

  it('should find different colored pieces to be different', () => {
    b.color = 'B'
    expect(piecesEqual(a, b)).toBe(false)
  })
})
