import { Action } from './Action'
import { Thunk } from '../middlewares'
import { applyMove, Coordinates } from '../../lib/util'
import { isLegalMove } from '../../lib/isLegalMove'

export class ResetBoardAction extends Action {}
export const resetBoard = (): ResetBoardAction => (new ResetBoardAction())

export class SetBoardAction extends Action {}
export const setBoard = (board: Board): SetBoardAction => (new SetBoardAction(board))

export class MovePieceAction extends Action {}
export const movePiece = (from: Coordinates, to: Coordinates): MovePieceAction => (new MovePieceAction({ from, to }))

export class RemovePieceAction extends Action {}
export const removePiece = (from: Coordinates): RemovePieceAction => (new RemovePieceAction(from))

export class SetPieceAction extends Action {}
export const setPiece = (at: Coordinates, piece: Piece): SetPieceAction => (new SetPieceAction({ at, piece }))

export class SetDraggingAction extends Action {}
export const setDragging = (dragging: boolean): SetDraggingAction => (new SetDraggingAction(dragging))

export class SelectPieceAction extends Action {}
export const selectPiece = (coordinates: Coordinates): SelectPieceAction => (new SelectPieceAction(coordinates.toString()))

export class DeselectPieceAction extends Action {}
export const deselectPiece = (): DeselectPieceAction => (new DeselectPieceAction())

export const makeMove: (move: Move) => Thunk = (move: Move) => {
  return (dispatch, getState) => {
    const { board } = getState()
    if (isLegalMove(move, [], board)) {
      applyMove(move, board)
    }

    dispatch(setBoard(board))
  }
}
