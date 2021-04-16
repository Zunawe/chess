import { Action } from './Action'
import { Thunk } from '../middlewares'
import * as Chess from 'chess-utils'

export class ResetBoardAction extends Action {}
export const resetBoard = (): ResetBoardAction => (new ResetBoardAction())

export class SetBoardAction extends Action {}
export const setBoard = (board: Chess.Board): SetBoardAction => (new SetBoardAction(board))

export class AddMoveAction extends Action {}
export const addMove = (move: Chess.Move): AddMoveAction => (new AddMoveAction(move))

export class SetDraggingAction extends Action {}
export const setDragging = (dragging: boolean): SetDraggingAction => (new SetDraggingAction(dragging))

export class SelectPieceAction extends Action {}
export const selectPiece = (coordinates: Chess.Coordinates): SelectPieceAction => (new SelectPieceAction(coordinates.toString()))

export class DeselectPieceAction extends Action {}
export const deselectPiece = (): DeselectPieceAction => (new DeselectPieceAction())

export const makeMove: (move: Chess.Move) => Thunk = (move: Chess.Move) => {
  return (dispatch, getState) => {
    const { game } = getState()
    if (Chess.isLegalMove(move, game)) {
      dispatch(setBoard(Chess.applyMove(move, game.board)))
      dispatch(addMove(move))
    }
  }
}
