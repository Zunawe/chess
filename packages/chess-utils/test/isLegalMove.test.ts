import { createPiece, createGame, isLegalMove, Game, Move, Board, decodeCoords, getEmptyBoard } from '../lib'

describe('isLegalMove', () => {
  describe('Bishop', () => {
    it('should allow a bishop to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('B', 'W')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('e3'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('e5'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('b2'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move3, game)).toBe(true)

      const move4: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('a7'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move4, game)).toBe(true)
    })

    it('should not allow a bishop to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('B', 'W')
      board[decodeCoords('e5')] = createPiece('P', 'W')
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('e5'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'W') },
        to: { coords: decodeCoords('a7'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })
  })

  describe('King', () => {
    it('should allow the king to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('f2'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('d1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move3, game)).toBe(true)
    })

    it('should not allow the king to capture its own piece', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('e2')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow the king to capture pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('e2')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the white king to castle kingside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('h1')] = createPiece('R', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('g1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the white king to castle queenside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the black king to castle kingside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e8')] = createPiece('K', 'B')
      board[decodeCoords('h8')] = createPiece('R', 'B')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      const game = createGame([{
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('a2'), piece: createPiece('R', 'W') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'B') },
        to: { coords: decodeCoords('g8'), piece: createPiece('K', 'B') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the black king to castle queenside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e8')] = createPiece('K', 'B')
      board[decodeCoords('a8')] = createPiece('R', 'B')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      const game = createGame([{
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('a2'), piece: createPiece('R', 'W') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'B') },
        to: { coords: decodeCoords('c8'), piece: createPiece('K', 'B') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow the king to castle if there is a piece blocking', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      board[decodeCoords('b1')] = createPiece('N', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the king has moved', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      const game = createGame([
        {
          from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
          to: { coords: decodeCoords('e2'), piece: createPiece('K', 'W') }
        },
        {
          from: { coords: decodeCoords('e2'), piece: createPiece('K', 'W') },
          to: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') }
        }
      ], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook has moved', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('a1')] = createPiece('R', 'W')
      const game = createGame([
        {
          from: { coords: decodeCoords('a1'), piece: createPiece('K', 'W') },
          to: { coords: decodeCoords('a2'), piece: createPiece('K', 'W') }
        },
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('K', 'W') },
          to: { coords: decodeCoords('a1'), piece: createPiece('K', 'W') }
        }
      ], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook is missing', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook is the wrong color', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'W')
      board[decodeCoords('a1')] = createPiece('K', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'W') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })
  })

  describe('Knight', () => {
    let game: Game

    beforeEach(() => {
      game = createGame()
    })

    it('should allow a knight to move normally', () => {
      const move: Move = {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'W') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'W') }
      }

      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow a knight to land on its own piece', () => {
      const move: Move = {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'W') },
        to: { coords: decodeCoords('d2'), piece: createPiece('N', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow a knight to capture', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('N', 'W')
      board[decodeCoords('e6')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('N', 'W') },
        to: { coords: decodeCoords('e6'), piece: createPiece('N', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })
  })

  describe('Pawn', () => {
    it('should allow a pawn to move forward one space', () => {
      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, createGame())).toBe(true)
    })

    it('should allow a pawn to move forward two spaces on its first turn', () => {
      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, createGame())).toBe(true)
    })

    it('should not allow a pawn to move forward two spaces on its second turn', () => {
      const game = createGame([{
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
      }])

      const move: Move = {
        from: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow a pawn to capture left', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'W')
      board[decodeCoords('a3')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow a pawn to capture right', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'W')
      board[decodeCoords('c3')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('c3'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow a pawn to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'W')
      board[decodeCoords('c3')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('c3'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move when it is blocked', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'W')
      board[decodeCoords('a3')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'W')
      board[decodeCoords('a4')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'W')
      board[decodeCoords('a3')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow en passant when applicable', () => {
      const game = createGame([
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
          to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
        },
        {
          from: { coords: decodeCoords('h7'), piece: createPiece('P', 'B') },
          to: { coords: decodeCoords('h6'), piece: createPiece('P', 'B') }
        },
        {
          from: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') },
          to: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') }
        },
        {
          from: { coords: decodeCoords('b7'), piece: createPiece('P', 'B') },
          to: { coords: decodeCoords('b5'), piece: createPiece('P', 'B') }
        }
      ])

      const move: Move = {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('b6'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow en passant if previous move was not relevant', () => {
      const game = createGame([
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('P', 'W') },
          to: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') }
        },
        {
          from: { coords: decodeCoords('b7'), piece: createPiece('P', 'B') },
          to: { coords: decodeCoords('b5'), piece: createPiece('P', 'B') }
        },
        {
          from: { coords: decodeCoords('a4'), piece: createPiece('P', 'W') },
          to: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') }
        },
        {
          from: { coords: decodeCoords('h7'), piece: createPiece('P', 'B') },
          to: { coords: decodeCoords('h6'), piece: createPiece('P', 'B') }
        }
      ])

      const move: Move = {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('b6'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow promotion to queen', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a8'), piece: createPiece('Q', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to bishop', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a8'), piece: createPiece('B', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to rook', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a8'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to knight', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a8'), piece: createPiece('N', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion of black pawns', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'B')
      board[decodeCoords('g7')] = createPiece('R', 'W')
      const game = createGame([{
        from: { coords: decodeCoords('g7'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('g8'), piece: createPiece('R', 'W') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'B') },
        to: { coords: decodeCoords('a1'), piece: createPiece('Q', 'B') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion while capturing', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      board[decodeCoords('b8')] = createPiece('R', 'B')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('b8'), piece: createPiece('Q', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow promotion when not on the back rank', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a3')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a3'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a4'), piece: createPiece('Q', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should require promotion on the back rank', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'W') },
        to: { coords: decodeCoords('a8'), piece: createPiece('P', 'W') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })
  })

  describe('Rook', () => {
    it('should allow a bishop to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'W')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('e4'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('d1'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('b4'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move3, game)).toBe(true)

      const move4: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('d8'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move4, game)).toBe(true)
    })

    it('should not allow a bishop to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'W')
      board[decodeCoords('d3')] = createPiece('P', 'W')
      board[decodeCoords('f4')] = createPiece('P', 'W')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('d3'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('f4'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })

    it('should not allow a bishop to move past pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'W')
      board[decodeCoords('d3')] = createPiece('P', 'W')
      board[decodeCoords('f4')] = createPiece('P', 'B')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('d1'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'W') },
        to: { coords: decodeCoords('h4'), piece: createPiece('R', 'W') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })
  })
})