import { createPiece, Coordinates, isLegalMove, Board, Move, createGame } from '../../lib'

describe('Rook', () => {
  it('should allow a bishop to move normally', () => {
    const board: Board = {}
    board.d4 = createPiece('R', 'L')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('e4'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('d1'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('b4'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move3, game)).toBe(true)

    const move4: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('d8'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move4, game)).toBe(true)
  })

  it('should not allow a bishop to capture its own pieces', () => {
    const board: Board = {}
    board.d4 = createPiece('R', 'L')
    board.d3 = createPiece('P', 'L')
    board.f4 = createPiece('P', 'L')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('d3'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('f4'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })

  it('should not allow a bishop to move past pieces', () => {
    const board: Board = {}
    board.d4 = createPiece('R', 'L')
    board.d3 = createPiece('P', 'L')
    board.f4 = createPiece('P', 'D')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('d1'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(false)

    const move2: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('h4'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(false)
  })
})
