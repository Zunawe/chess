import { createPiece, Coordinates, isLegalMove, createGame, Move, Board } from '../../lib'

describe('King', () => {
  it('should allow the king to move normally', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    const game = createGame([], board)

    const move1: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('e2'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move1, game)).toBe(true)

    const move2: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('f2'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move2, game)).toBe(true)

    const move3: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('d1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move3, game)).toBe(true)
  })

  it('should not allow the king to capture its own piece', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.e2 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('e2'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow the king to capture pieces', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.e2 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('e2'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the white king to castle kingside', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.h1 = createPiece('R', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('g1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the white king to castle queenside', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.a1 = createPiece('R', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the black king to castle kingside', () => {
    const board: Board = {}
    board.e8 = createPiece('K', 'D')
    board.h8 = createPiece('R', 'D')
    board.a1 = createPiece('R', 'L')
    const game = createGame([{
      from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('a2'), piece: createPiece('R', 'L') }
    }], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e8'), piece: createPiece('K', 'D') },
      to: { coordinates: new Coordinates('g8'), piece: createPiece('K', 'D') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow the black king to castle queenside', () => {
    const board: Board = {}
    board.e8 = createPiece('K', 'D')
    board.a8 = createPiece('R', 'D')
    board.a1 = createPiece('R', 'L')
    const game = createGame([{
      from: { coordinates: new Coordinates('a1'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('a2'), piece: createPiece('R', 'L') }
    }], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e8'), piece: createPiece('K', 'D') },
      to: { coordinates: new Coordinates('c8'), piece: createPiece('K', 'D') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow the king to castle if there is a piece blocking', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.a1 = createPiece('R', 'L')
    board.b1 = createPiece('N', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the king has moved', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.a1 = createPiece('R', 'L')
    const game = createGame([
      {
        from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
        to: { coordinates: new Coordinates('e2'), piece: createPiece('K', 'L') }
      },
      {
        from: { coordinates: new Coordinates('e2'), piece: createPiece('K', 'L') },
        to: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') }
      }
    ], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook has moved', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.a1 = createPiece('R', 'L')
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a1'), piece: createPiece('K', 'L') },
        to: { coordinates: new Coordinates('a2'), piece: createPiece('K', 'L') }
      },
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('K', 'L') },
        to: { coordinates: new Coordinates('a1'), piece: createPiece('K', 'L') }
      }
    ], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook is missing', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow the king to castle if the rook is the wrong color', () => {
    const board: Board = {}
    board.e1 = createPiece('K', 'L')
    board.a1 = createPiece('K', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('e1'), piece: createPiece('K', 'L') },
      to: { coordinates: new Coordinates('c1'), piece: createPiece('K', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })
})
