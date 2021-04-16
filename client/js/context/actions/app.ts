import { Action } from './Action'
import { Thunk } from '../middlewares'
import * as Chess from 'chess-utils'

export class ResetBoardAction extends Action {}
export const resetBoard = (): ResetBoardAction => (new ResetBoardAction())

export class SetBoardAction extends Action {}
export const setBoard = (board: Chess.Board): SetBoardAction => (new SetBoardAction(board))

export class AddMoveAction extends Action {}
export const addMove = (move: Chess.Move): AddMoveAction => (new AddMoveAction(move))

export class MovePieceAction extends Action {}
export const movePiece = (from: Chess.Coordinates, to: Chess.Coordinates): MovePieceAction => (new MovePieceAction({ from, to }))

export class RemovePieceAction extends Action {}
export const removePiece = (from: Chess.Coordinates): RemovePieceAction => (new RemovePieceAction(from))

export class SetPieceAction extends Action {}
export const setPiece = (at: Chess.Coordinates, piece: Chess.Piece): SetPieceAction => (new SetPieceAction({ at, piece }))

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
