import { createGame, createPiece, decodeCoords, toCoords, getFile, getRank, encodeCoords } from '../lib'

describe('coordinates', () => {
  describe('toCoords', () => {
    it('should convert file 0 rank 0 to 0', () => {
      expect(toCoords(0, 0)).toBe(0)
    })

    it('should convert file 4 rank 0 to 4', () => {
      expect(toCoords(4, 0)).toBe(4)
    })

    it('should convert file 0 rank 3 to 24', () => {
      expect(toCoords(0, 3)).toBe(24)
    })

    it('should convert file 2 rank 4 to 24', () => {
      expect(toCoords(2, 4)).toBe(34)
    })
  })

  describe('getFile', () => {
    it('should get file correctly', () => {
      expect(getFile(0)).toBe(0)
      expect(getFile(1)).toBe(1)
      expect(getFile(10)).toBe(2)
      expect(getFile(60)).toBe(4)
    })
  })

  describe('getRank', () => {
    it('should get rank correctly', () => {
      expect(getRank(0)).toBe(0)
      expect(getRank(1)).toBe(0)
      expect(getRank(10)).toBe(1)
      expect(getRank(60)).toBe(7)
    })
  })

  describe('encodeCoords', () => {
    it('should encode coordinates correctly from single number', () => {
      expect(encodeCoords(0)).toBe('a1')
      expect(encodeCoords(1)).toBe('b1')
      expect(encodeCoords(15)).toBe('h2')
      expect(encodeCoords(55)).toBe('h7')
    })
  })

  describe('decodeCoords', () => {
    it('should decode coordinates correctly', () => {
      expect(decodeCoords('a1')).toBe(0)
      expect(decodeCoords('b1')).toBe(1)
      expect(decodeCoords('h2')).toBe(15)
      expect(decodeCoords('h7')).toBe(55)
    })
  })
})
