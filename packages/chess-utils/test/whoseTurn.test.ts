import { createGame, createPiece, decodeCoords, whoseTurn } from '../lib'

describe('whoseTurn', () => {
  it('should return W for the first turn', () => {
    const game = createGame()
    expect(whoseTurn(game)).toBe('W')
  })

  it('should return B for odd turns', () => {
    const game = createGame([{
      from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
      to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
    }])
    expect(whoseTurn(game)).toBe('B')
  })

  it('should return W for even turns', () => {
    const game = createGame([
      {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
      },
      {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('a6'), piece: createPiece('P', 'B') }
      }
    ])
    expect(whoseTurn(game)).toBe('W')
  })
})
