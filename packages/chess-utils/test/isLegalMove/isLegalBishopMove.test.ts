import { createPiece, createGame, Coordinates, isLegalMove, Game, Move, Board } from '../../lib'

describe('Bishop', () => {
  it('should allow a bishop to move normally', () => {
  const board: Board = {}
    board.d4 = createPiece('B', 'L')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('e3'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('e5'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('b2'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move3, game)).toBe(true)

    const move4: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('a7'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move4, game)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    const board: Board = {}
    board.d4 = createPiece('B', 'L')
    board.e5 = createPiece('P', 'L')
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('e5'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('B', 'L') },
      to: { coordinates: new Coordinates('a7'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })
})
