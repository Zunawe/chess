import { createPiece, createGame, isLegalMove, Game, Move, Board, decodeCoords, getEmptyBoard } from '../lib'

describe('isLegalMove', () => {
  describe('Bishop', () => {
    it('should allow a bishop to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('B', 'L')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('e3'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('e5'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('b2'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move3, game)).toBe(true)

      const move4: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('a7'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move4, game)).toBe(true)
    })

    it('should not allow a bishop to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('B', 'L')
      board[decodeCoords('e5')] = createPiece('P', 'L')
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('e5'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('B', 'L') },
        to: { coords: decodeCoords('a7'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })
  })

  describe('King', () => {
    it('should allow the king to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('f2'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('d1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move3, game)).toBe(true)
    })

    it('should not allow the king to capture its own piece', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('e2')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow the king to capture pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('e2')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('e2'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the white king to castle kingside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('h1')] = createPiece('R', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('g1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the white king to castle queenside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the black king to castle kingside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e8')] = createPiece('K', 'D')
      board[decodeCoords('h8')] = createPiece('R', 'D')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      const game = createGame([{
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('a2'), piece: createPiece('R', 'L') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'D') },
        to: { coords: decodeCoords('g8'), piece: createPiece('K', 'D') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow the black king to castle queenside', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e8')] = createPiece('K', 'D')
      board[decodeCoords('a8')] = createPiece('R', 'D')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      const game = createGame([{
        from: { coords: decodeCoords('a1'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('a2'), piece: createPiece('R', 'L') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('e8'), piece: createPiece('K', 'D') },
        to: { coords: decodeCoords('c8'), piece: createPiece('K', 'D') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow the king to castle if there is a piece blocking', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      board[decodeCoords('b1')] = createPiece('N', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the king has moved', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      const game = createGame([
        {
          from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
          to: { coords: decodeCoords('e2'), piece: createPiece('K', 'L') }
        },
        {
          from: { coords: decodeCoords('e2'), piece: createPiece('K', 'L') },
          to: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') }
        }
      ], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook has moved', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('a1')] = createPiece('R', 'L')
      const game = createGame([
        {
          from: { coords: decodeCoords('a1'), piece: createPiece('K', 'L') },
          to: { coords: decodeCoords('a2'), piece: createPiece('K', 'L') }
        },
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('K', 'L') },
          to: { coords: decodeCoords('a1'), piece: createPiece('K', 'L') }
        }
      ], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook is missing', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow the king to castle if the rook is the wrong color', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('e1')] = createPiece('K', 'L')
      board[decodeCoords('a1')] = createPiece('K', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('e1'), piece: createPiece('K', 'L') },
        to: { coords: decodeCoords('c1'), piece: createPiece('K', 'L') }
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
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'L') },
        to: { coords: decodeCoords('c3'), piece: createPiece('N', 'L') }
      }

      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow a knight to land on its own piece', () => {
      const move: Move = {
        from: { coords: decodeCoords('b1'), piece: createPiece('N', 'L') },
        to: { coords: decodeCoords('d2'), piece: createPiece('N', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow a knight to capture', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('N', 'L')
      board[decodeCoords('e6')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('N', 'L') },
        to: { coords: decodeCoords('e6'), piece: createPiece('N', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })
  })

  describe('Pawn', () => {
    it('should allow a pawn to move forward one space', () => {
      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, createGame())).toBe(true)
    })

    it('should allow a pawn to move forward two spaces on its first turn', () => {
      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, createGame())).toBe(true)
    })

    it('should not allow a pawn to move forward two spaces on its second turn', () => {
      const game = createGame([{
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
      }])

      const move: Move = {
        from: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow a pawn to capture left', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'L')
      board[decodeCoords('a3')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow a pawn to capture right', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'L')
      board[decodeCoords('c3')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('c3'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow a pawn to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('b2')] = createPiece('P', 'L')
      board[decodeCoords('c3')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('b2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('c3'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move when it is blocked', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'L')
      board[decodeCoords('a3')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'L')
      board[decodeCoords('a4')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'L')
      board[decodeCoords('a3')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow en passant when applicable', () => {
      const game = createGame([
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
          to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
        },
        {
          from: { coords: decodeCoords('h7'), piece: createPiece('P', 'D') },
          to: { coords: decodeCoords('h6'), piece: createPiece('P', 'D') }
        },
        {
          from: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') },
          to: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') }
        },
        {
          from: { coords: decodeCoords('b7'), piece: createPiece('P', 'D') },
          to: { coords: decodeCoords('b5'), piece: createPiece('P', 'D') }
        }
      ])

      const move: Move = {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('b6'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow en passant if previous move was not relevant', () => {
      const game = createGame([
        {
          from: { coords: decodeCoords('a2'), piece: createPiece('P', 'L') },
          to: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') }
        },
        {
          from: { coords: decodeCoords('b7'), piece: createPiece('P', 'D') },
          to: { coords: decodeCoords('b5'), piece: createPiece('P', 'D') }
        },
        {
          from: { coords: decodeCoords('a4'), piece: createPiece('P', 'L') },
          to: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') }
        },
        {
          from: { coords: decodeCoords('h7'), piece: createPiece('P', 'D') },
          to: { coords: decodeCoords('h6'), piece: createPiece('P', 'D') }
        }
      ])

      const move: Move = {
        from: { coords: decodeCoords('a5'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('b6'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should allow promotion to queen', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a8'), piece: createPiece('Q', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to bishop', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a8'), piece: createPiece('B', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to rook', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a8'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion to knight', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a8'), piece: createPiece('N', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion of black pawns', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a2')] = createPiece('P', 'D')
      board[decodeCoords('g7')] = createPiece('R', 'L')
      const game = createGame([{
        from: { coords: decodeCoords('g7'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('g8'), piece: createPiece('R', 'L') }
      }], board)

      const move: Move = {
        from: { coords: decodeCoords('a2'), piece: createPiece('P', 'D') },
        to: { coords: decodeCoords('a1'), piece: createPiece('Q', 'D') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should allow promotion while capturing', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      board[decodeCoords('b8')] = createPiece('R', 'D')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('b8'), piece: createPiece('Q', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(true)
    })

    it('should not allow promotion when not on the back rank', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a3')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a3'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a4'), piece: createPiece('Q', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })

    it('should require promotion on the back rank', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('a7')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move: Move = {
        from: { coords: decodeCoords('a7'), piece: createPiece('P', 'L') },
        to: { coords: decodeCoords('a8'), piece: createPiece('P', 'L') }
      }
      expect(isLegalMove(move, game)).toBe(false)
    })
  })

  describe('Rook', () => {
    it('should allow a bishop to move normally', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'L')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('e4'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(true)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('d1'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(true)

      const move3: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('b4'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move3, game)).toBe(true)

      const move4: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('d8'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move4, game)).toBe(true)
    })

    it('should not allow a bishop to capture its own pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'L')
      board[decodeCoords('d3')] = createPiece('P', 'L')
      board[decodeCoords('f4')] = createPiece('P', 'L')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('d3'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('f4'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })

    it('should not allow a bishop to move past pieces', () => {
      const board: Board = getEmptyBoard()
      board[decodeCoords('d4')] = createPiece('R', 'L')
      board[decodeCoords('d3')] = createPiece('P', 'L')
      board[decodeCoords('f4')] = createPiece('P', 'D')
      const game = createGame([], board)

      const move1: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('d1'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move1, game)).toBe(false)

      const move2: Move = {
        from: { coords: decodeCoords('d4'), piece: createPiece('R', 'L') },
        to: { coords: decodeCoords('h4'), piece: createPiece('R', 'L') }
      }
      expect(isLegalMove(move2, game)).toBe(false)
    })
  })
})