import { Action } from './Action'
import { Thunk } from '../middlewares'
import * as Chess from 'chess-utils'

export class ResetBoardAction extends Action {}
export const resetBoard = (): ResetBoardAction => (new ResetBoardAction())

export class SetBoardAction extends Action {}
export const setBoard = (board: Chess.Board): SetBoardAction => (new SetBoardAction(board))

export class SetGameAction extends Action {}
export const setGame = (game: Chess.Game): SetGameAction => (new SetGameAction(game))

export class AddMoveAction extends Action {}
export const addMove = (move: Chess.Move): AddMoveAction => (new AddMoveAction(move))

export class UndoLastMoveAction extends Action {}
export const undoLastMove = (): UndoLastMoveAction => (new UndoLastMoveAction())

export class ReplaceLastMoveAction extends Action {}
export const replaceLastMove = (move: Chess.Move): ReplaceLastMoveAction => (new ReplaceLastMoveAction(move))

export class SetDraggingAction extends Action {}
export const setDragging = (dragging: boolean): SetDraggingAction => (new SetDraggingAction(dragging))

export class SelectPieceAction extends Action {}
export const selectPiece = (coordinates: Chess.Coordinates): SelectPieceAction => (new SelectPieceAction(coordinates.toString()))

export class DeselectPieceAction extends Action {}
export const deselectPiece = (): DeselectPieceAction => (new DeselectPieceAction())

export class SetPromotingAction extends Action {}
export const setPromoting = (value: boolean): SetPromotingAction => (new SetPromotingAction(value))

export const makeMove: (move: Chess.Move) => Thunk = (move: Chess.Move) => {
  return (dispatch, getState) => {
    const { game } = getState()
    if (Chess.isLegalMove(move, game)) {
      dispatch(setGame(Chess.applyMove(move, game)))
    }
  }
}

export const attemptPromotion: (move: Chess.Move) => Thunk = (move: Chess.Move) => {
  return (dispatch, getState) => {
    const { game } = getState()

    const testMove: Chess.Move = Chess.copyMove(move)
    testMove.to[1].type = 'Q'
    if (Chess.isLegalMove(testMove, game)) {
      dispatch(setGame(Chess.applyMove(move, game)))
      dispatch(setPromoting(true))
    }
  }
}

export const stopPromotion: () => Thunk = () => {
  return (dispatch, getState) => {
    const { promoting } = getState()

    if (!promoting) {
      return
    }

    dispatch(undoLastMove())
    dispatch(setPromoting(false))
  }
}
