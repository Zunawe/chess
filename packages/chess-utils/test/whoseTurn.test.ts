import { createGame, createPiece, decodeCoords, whoseTurn } from '../lib'

describe('whoseTurn', () => {
  it('should return L for the first turn', () => {
    const game = createGame()
    expect(whoseTurn(game)).toBe('L')
  })

  it('should return D for odd turns', () => {
    const game = createGame([{
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
    }])
    expect(whoseTurn(game)).toBe('D')
  })

  it('should return L for even turns', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
      },
      {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('a6'), piece: createPiece('P', 'D') }
      }
    ])
    expect(whoseTurn(game)).toBe('L')
  })
})
