import { piecesEqual, coordinatesEqual } from '../../../../client/js/lib/util'

describe('util', () => {
  describe('coordinatesEqual', () => {
    let a: Coordinates, b: Coordinates

    beforeEach(() => {
      a = {
        rank: 0,
        file: 0
      }
      b = {
        rank: 0,
        file: 0
      }
    })

    it('should find coordinates to be equal to themselves', () => {
      expect(coordinatesEqual(a, a)).toBe(true)
      expect(coordinatesEqual(a, b)).toBe(true)
    })

    it('should find different ranks to be different', () => {
      b.rank = 1
      expect(coordinatesEqual(a, b)).toBe(false)
    })

    it('should find different files to be different', () => {
      b.file = 1
      expect(coordinatesEqual(a, b)).toBe(false)
    })
  })

  describe('piecesEqual', () => {
    let a: Piece, b: Piece

    beforeEach(() => {
      a = {
        type: 'P',
        color: 'L',
        coordinates: {
          rank: 0,
          file: 0
        }
      }
      b = {
        type: 'P',
        color: 'L',
        coordinates: {
          rank: 0,
          file: 0
        }
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
      b.color = 'D'
      expect(piecesEqual(a, b)).toBe(false)
    })

    it('should find pieces in different positions to be different', () => {
      b.coordinates.rank = 4
      expect(piecesEqual(a, b)).toBe(false)
    })
  })
})
