import { getStartingBoard, applyMoves, createPiece, Coordinates } from '../../../../../client/js/lib/util'
import { isLegalMove } from '../../../../../client/js/lib/isLegalMove'

describe('Pawn', () => {
  let board: Board

  beforeEach(() => {
    board = getStartingBoard()
  })

  it('should allow a pawn to move forward one space', () => {
    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow a pawn to move forward two spaces on its first turn', () => {
    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should not allow a pawn to move forward two spaces on its second turn', () => {
    const moves: Move[] = [{
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }]
    board = applyMoves(moves, board)

    const move: Move = {
      from: [new Coordinates('a3'), createPiece('P', 'L')],
      to: [new Coordinates('a5'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, moves, board)).toBe(false)
  })

  it('should allow a pawn to capture left', () => {
    const board: Board = {}
    board['b2'] = createPiece('P', 'L')
    board['a3'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow a pawn to capture right', () => {
    const board: Board = {}
    board['b2'] = createPiece('P', 'L')
    board['c3'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('c3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should not allow a pawn to capture its own pieces', () => {
    const board: Board = {}
    board['b2'] = createPiece('P', 'L')
    board['c3'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('b2'), createPiece('P', 'L')],
      to: [new Coordinates('c3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should not allow a pawn to move when it is blocked', () => {
    const board: Board = {}
    board['a2'] = createPiece('P', 'L')
    board['a3'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a3'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked', () => {
    const board: Board = {}
    board['a2'] = createPiece('P', 'L')
    board['a4'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
    const board: Board = {}
    board['a2'] = createPiece('P', 'L')
    board['a3'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should allow en passant when applicable', () => {
    const moves: Move[] = [
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
    board = applyMoves(moves, board)

    const move: Move = {
      from: [new Coordinates('a5'), createPiece('P', 'L')],
      to: [new Coordinates('b6'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, moves, board)).toBe(true)
  })

  it('should not allow en passant if previous move was not relevant', () => {
    const moves: Move[] = [
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
    board = applyMoves(moves, board)

    const move: Move = {
      from: [new Coordinates('a5'), createPiece('P', 'L')],
      to: [new Coordinates('b6'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, moves, board)).toBe(false)
  })

  it('should allow promotion to queen', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow promotion to bishop', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('B', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow promotion to rook', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('R', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow promotion to knight', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow promotion of black pawns', () => {
    const board: Board = {}
    board['a2'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('a2'), createPiece('P', 'D')],
      to: [new Coordinates('a1'), createPiece('Q', 'D')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should allow promotion while capturing', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')
    board['b8'] = createPiece('R', 'D')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('b8'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(true)
  })

  it('should not allow promotion when not on the back rank', () => {
    const board: Board = {}
    board['a3'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a3'), createPiece('P', 'L')],
      to: [new Coordinates('a4'), createPiece('Q', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })

  it('should require promotion on the back rank', () => {
    const board: Board = {}
    board['a7'] = createPiece('P', 'L')

    const move: Move = {
      from: [new Coordinates('a7'), createPiece('P', 'L')],
      to: [new Coordinates('a8'), createPiece('P', 'L')]
    }
    expect(isLegalMove(move, [], board)).toBe(false)
  })
})
