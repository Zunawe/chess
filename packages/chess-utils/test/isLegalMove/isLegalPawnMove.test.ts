import { createPiece, Coordinates, isLegalMove, getStartingBoard, applyMoves, Game, Move } from '../../lib'

describe('Pawn', () => {
  let game: Game

  beforeEach(() => {
    game = {
      board: getStartingBoard(),
      moves: []
    }
  })

  it('should allow a pawn to move forward one space', () => {
    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow a pawn to move forward two spaces on its first turn', () => {
    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow a pawn to move forward two spaces on its second turn', () => {
    game.moves = [{
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }]
    game = applyMoves(game.moves, game)

    const move: Move = {
      from: [new Coordinates('a3'), createPiece('P', 'L')],
      to: [new Coordinates('a5'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow a pawn to capture left', () => {
    game.board = {}
    game.board.b2 = createPiece('P', 'L')
    game.board.a3 = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow a pawn to capture right', () => {
    game.board = {}
    game.board.b2 = createPiece('P', 'L')
    game.board.c3 = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('c3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow a pawn to capture its own pieces', () => {
    game.board = {}
    game.board.b2 = createPiece('P', 'L')
    game.board.c3 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('c3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move when it is blocked', () => {
    game.board = {}
    game.board.a2 = createPiece('P', 'L')
    game.board.a3 = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked', () => {
    game.board = {}
    game.board.a2 = createPiece('P', 'L')
    game.board.a4 = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
    game.board = {}
    game.board.a2 = createPiece('P', 'L')
    game.board.a3 = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow en passant when applicable', () => {
    game.moves = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('h7'), createPiece('P', 'D')],
        to: [new Coordinates('h6'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('a4'), createPiece('P', 'L')],
        to: [new Coordinates('a5'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('b7'), createPiece('P', 'D')],
        to: [new Coordinates('b5'), createPiece('P', 'D')]
      }
    ]
    game = applyMoves(game.moves, game)

    const move: Move = {
      from: [new Coordinates('a5'), createPiece('P', 'L')],
      to: [new Coordinates('b6'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow en passant if previous move was not relevant', () => {
    game.moves = [
      {
        from: [new Coordinates('a2'), createPiece('P', 'L')],
        to: [new Coordinates('a4'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('b7'), createPiece('P', 'D')],
        to: [new Coordinates('b5'), createPiece('P', 'D')]
      },
      {
        from: [new Coordinates('a4'), createPiece('P', 'L')],
        to: [new Coordinates('a5'), createPiece('P', 'L')]
      },
      {
        from: [new Coordinates('h7'), createPiece('P', 'D')],
        to: [new Coordinates('h6'), createPiece('P', 'D')]
      }
    ]
    game = applyMoves(game.moves, game)

    const move: Move = {
      from: [new Coordinates('a5'), createPiece('P', 'L')],
      to: [new Coordinates('b6'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow promotion to queen', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to bishop', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to rook', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion to knight', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion of black pawns', () => {
    game.board = {}
    game.board.a2 = createPiece('P', 'D')
    game.board.g8 = createPiece('R', 'L')
    game.moves = [{
      from: [new Coordinates('g7'), createPiece('R', 'L')],
      to: [new Coordinates('g8'), createPiece('R', 'L')]
    }]

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'D')],
      to: [new Coordinates('a1'), createPiece('Q', 'D')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should allow promotion while capturing', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')
    game.board.b8 = createPiece('R', 'D')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('b8'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow promotion when not on the back rank', () => {
    game.board = {}
    game.board.a3 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a3'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should require promotion on the back rank', () => {
    game.board = {}
    game.board.a7 = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })
})
