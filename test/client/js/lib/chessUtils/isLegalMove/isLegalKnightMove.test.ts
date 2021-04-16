import { createPiece, Coordinates, isLegalMove, getStartingBoard } from '../../../../../../client/js/lib/chessUtils'

describe('Knight', () => {
  let game: Game

  beforeEach(() => {
    game = {
      board: getStartingBoard(),
      moves: []
    }
  })

  it('should allow a knight to move normally', () => {
    const move: Move = {
      from: [new Coordinates('b1'), createPiece('N', 'L')],
      to: [new Coordinates('c3'), createPiece('N', 'L')]
    }

    expect(isLegalMove(move, game)).toBe(true)
  })

  it('should not allow a knight to land on its own piece', () => {
    const move: Move = {
      from: [new Coordinates('b1'), createPiece('N', 'L')],
      to: [new Coordinates('d2'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(false)
  })

  it('should allow a knight to capture', () => {
    game.board = {}
    game.board['d4'] = createPiece('N', 'L')
    game.board['e6'] = createPiece('P', 'D')

    const move: Move = {
      from: [new Coordinates('d4'), createPiece('N', 'L')],
      to: [new Coordinates('e6'), createPiece('N', 'L')]
    }
    expect(isLegalMove(move, game)).toBe(true)
  })
})
