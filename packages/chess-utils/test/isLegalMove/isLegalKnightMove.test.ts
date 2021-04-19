import { createPiece, Coordinates, isLegalMove, Board, Game, Move, createGame } from '../../lib'

describe('Knight', () => {
  let game: Game

  beforeEach(() => {
    game = createGame()
  })

  it('should allow a knight to move normally', () => {
    const move: Move = {
      from: { coordinates: new Coordinates('b1'), piece: createPiece('N', 'L') },
      to: { coordinates: new Coordinates('c3'), piece: createPiece('N', 'L') }
    }

    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow a knight to land on its own piece', () => {
    const move: Move = {
      from: { coordinates: new Coordinates('b1'), piece: createPiece('N', 'L') },
      to: { coordinates: new Coordinates('d2'), piece: createPiece('N', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow a knight to capture', () => {
    const board: Board = {}
    board.d4 = createPiece('N', 'L')
    board.e6 = createPiece('P', 'D')
    const game = createGame([], board)

    const move: Move = {
      from: { coordinates: new Coordinates('d4'), piece: createPiece('N', 'L') },
      to: { coordinates: new Coordinates('e6'), piece: createPiece('N', 'L') }
    }
    expect(isLegalMove(move, game)).toBe(true)
  })
})
