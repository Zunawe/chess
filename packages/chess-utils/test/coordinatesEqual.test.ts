import { coordinatesEqual, Coordinates } from '../lib'

describe('coordinatesEqual', () => {
  let a: Coordinates, b: Coordinates

  beforeEach(() => {
    a = new Coordinates(0, 0)
    b = new Coordinates(0, 0)
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
