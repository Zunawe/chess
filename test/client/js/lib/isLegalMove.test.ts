import { movesEqual, getStartingBoard, applyMove, applyMoves, createPiece } from '../../../../client/js/lib/util'
import { isLegalMove } from '../../../../client/js/lib/isLegalMove'

describe('isLegalMove', () => {
  describe('pawns', () => {
    let board: Piece[]
    let piece: Piece

    beforeEach(() => {
      board = getStartingBoard()
      piece = createPiece('P', 'L', 1, 0)
    })

    it('should allow a pawn to move forward one space', () => {
      const move: Move = {
        piece,
        to: { rank: 2, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(true)
    })

    it('should allow a pawn to move forward two spaces on its first turn', () => {
      const move: Move = {
        piece,
        to: { rank: 3, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(true)
    })

    it('should not allow a pawn to move forward two spaces on its second turn', () => {
      const moves = [{
        piece: createPiece('P', 'L', 1, 0),
        to: { rank: 2, file: 0 }
      }]
      applyMoves(moves, board)

      const move: Move = {
        piece: createPiece('P', 'L', 2, 0),
        to: { rank: 4, file: 0 }
      }
      expect(isLegalMove(move, moves, board)).toBe(false)
    })

    it('should allow a pawn to capture left', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 1),
        createPiece('P', 'D', 2, 0)
      ]

      const move: Move = {
        piece: createPiece('P', 'L', 1, 1),
        to: { rank: 2, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(true)
    })

    it('should allow a pawn to capture right', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 1),
        createPiece('P', 'D', 2, 2)
      ]

      const move: Move = {
        piece: createPiece('P', 'L', 1, 1),
        to: { rank: 2, file: 2 }
      }
      expect(isLegalMove(move, [], board)).toBe(true)
    })

    it('should not allow a pawn to capture its own pieces', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 1),
        createPiece('P', 'L', 2, 2)
      ]

      const move: Move = {
        piece: createPiece('P', 'L', 1, 1),
        to: { rank: 2, file: 2 }
      }
      expect(isLegalMove(move, [], board)).toBe(false)
    })

    it('should not allow a pawn to move when it is blocked', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 0),
        createPiece('P', 'D', 2, 0)
      ]
      const move: Move = {
        piece: createPiece('P', 'L', 1, 0),
        to: { rank: 2, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 0),
        createPiece('P', 'D', 3, 0)
      ]
      const move: Move = {
        piece: createPiece('P', 'L', 1, 0),
        to: { rank: 3, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(false)
    })

    it('should not allow a pawn to move two spaces when it is blocked from moving one', () => {
      const board: Piece[] = [
        createPiece('P', 'L', 1, 0),
        createPiece('P', 'D', 2, 0)
      ]
      const move: Move = {
        piece: createPiece('P', 'L', 1, 0),
        to: { rank: 3, file: 0 }
      }
      expect(isLegalMove(move, [], board)).toBe(false)
    })

    it('should allow en passant when applicable', () => {
      const moves = [
        {
          piece: createPiece('P', 'L', 1, 0),
          to: { rank: 3, file: 0 }
        },
        {
          piece: createPiece('P', 'D', 6, 7),
          to: { rank: 6, file: 6 }
        },
        {
          piece: createPiece('P', 'L', 3, 0),
          to: { rank: 4, file: 0 }
        },
        {
          piece: createPiece('P', 'D', 6, 1),
          to: { rank: 4, file: 1 }
        }
      ]
      applyMoves(moves, board)

      const move: Move = {
        piece: createPiece('P', 'L', 4, 0),
        to: { rank: 5, file: 1 }
      }
      expect(isLegalMove(move, moves, board)).toBe(true)
    })

    it('should not allow en passant if previous move was not relevant', () => {
      const moves = [
        {
          piece: createPiece('P', 'L', 1, 0),
          to: { rank: 3, file: 0 }
        },
        {
          piece: createPiece('P', 'D', 6, 1),
          to: { rank: 4, file: 1 }
        },
        {
          piece: createPiece('P', 'L', 3, 0),
          to: { rank: 4, file: 0 }
        },
        {
          piece: createPiece('P', 'D', 6, 7),
          to: { rank: 6, file: 6 }
        }
      ]
      applyMoves(moves, board)

      const move: Move = {
        piece: createPiece('P', 'L', 4, 0),
        to: {
          rank: 5,
          file: 1
        }
      }
      expect(isLegalMove(move, moves, board)).toBe(false)
    })
  })
})
