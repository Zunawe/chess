import { createPiece, Coordinates, isLegalMove, getStartingBoard, Board, Game, Move, createGame } from '../../lib'

describe('Pawn', () => {
  it('should allow a pawn to move forward one space', () => {
    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, createGame())).toBe(true)
  })

  it('should allow a pawn to move forward two spaces on its first turn', () => {
    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, createGame())).toBe(true)
  })

  it('should not allow a pawn to move forward two spaces on its second turn', () => {
    const game = createGame([{
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') }
    }])

    const move: Move = {
      from: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow a pawn to capture left', () => {
    const board: Board = {}
    board.b2 = createPiece('P', 'L')
    board.a3 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('b2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow a pawn to capture right', () => {
    const board: Board = {}
    board.b2 = createPiece('P', 'L')
    board.c3 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('b2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('c3'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow a pawn to capture its own pieces', () => {
    const board: Board = {}
    board.b2 = createPiece('P', 'L')
    board.c3 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('b2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('c3'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move when it is blocked', () => {
    const board: Board = {}
    board.a2 = createPiece('P', 'L')
    board.a3 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked', () => {
    const board: Board = {}
    board.a2 = createPiece('P', 'L')
    board.a4 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
    const board: Board = {}
    board.a2 = createPiece('P', 'L')
    board.a3 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow en passant when applicable', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('h7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('h6'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('b7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('b5'), piece: createPiece('P', 'D') }
      }
    ])

    const move: Move = {
      from: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('b6'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow en passant if previous move was not relevant', () => {
    const game = createGame([
      {
        from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('b7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('b5'), piece: createPiece('P', 'D') }
      },
      {
        from: { coordinates: new Coordinates('a4'), piece: createPiece('P', 'L') },
        to: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') }
      },
      {
        from: { coordinates: new Coordinates('h7'), piece: createPiece('P', 'D') },
        to: { coordinates: new Coordinates('h6'), piece: createPiece('P', 'D') }
      }
    ])

    const move: Move = {
      from: { coordinates: new Coordinates('a5'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('b6'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow promotion to queen', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a8'), piece: createPiece('Q', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to bishop', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a8'), piece: createPiece('B', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to rook', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a8'), piece: createPiece('R', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to knight', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a8'), piece: createPiece('N', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion of black pawns', () => {
    const board: Board = {}
    board.a2 = createPiece('P', 'D')
    board.g7 = createPiece('R', 'L')
    const game = createGame([{
      from: { coordinates: new Coordinates('g7'), piece: createPiece('R', 'L') },
      to: { coordinates: new Coordinates('g8'), piece: createPiece('R', 'L') }
    }], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a2'), piece: createPiece('P', 'D') },
      to: { coordinates: new Coordinates('a1'), piece: createPiece('Q', 'D') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion while capturing', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    board.b8 = createPiece('R', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('b8'), piece: createPiece('Q', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow promotion when not on the back rank', () => {
    const board: Board = {}
    board.a3 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a3'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a4'), piece: createPiece('Q', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should require promotion on the back rank', () => {
    const board: Board = {}
    board.a7 = createPiece('P', 'L')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('a7'), piece: createPiece('P', 'L') },
      to: { coordinates: new Coordinates('a8'), piece: createPiece('P', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })
})
