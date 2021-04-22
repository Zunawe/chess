import * as Chess from 'chess-utils'

import { Action } from './Action'
import { sendLastMove } from './socket'
import { Thunk } from '../middlewares'

export class ResetGameAction extends Action {}
export const resetGame = (): ResetGameAction => (new ResetGameAction())

export class SetGameAction extends Action {}
export const setGame = (game: Chess.Game): SetGameAction => (new SetGameAction(game))

export class UndoLastMoveAction extends Action {}
export const undoLastMove = (): UndoLastMoveAction => (new UndoLastMoveAction())

export class ReplaceLastMoveAction extends Action {}
export const replaceLastMove = (move: Chess.Move): ReplaceLastMoveAction => (new ReplaceLastMoveAction(move))

export class SelectPieceAction extends Action {}
export const selectPiece = (coords: number): SelectPieceAction => (new SelectPieceAction(coords))

export class DeselectPieceAction extends Action {}
export const deselectPiece = (): DeselectPieceAction => (new DeselectPieceAction())

export class SetDraggingAction extends Action {}
export const setDragging = (dragging: boolean): SetDraggingAction => (new SetDraggingAction(dragging))

export class SetPromotingAction extends Action {}
export const setPromoting = (value: boolean): SetPromotingAction => (new SetPromotingAction(value))

export class SetPerspectiveAction extends Action {}
export const setPerspective = (color: Chess.Color): SetPerspectiveAction => (new SetPerspectiveAction(color))

export class SetColorAction extends Action {}
export const setColor = (color: Chess.Color): SetColorAction => (new SetColorAction(color))

export const makeMove: (move: Chess.Move) => Thunk = (move: Chess.Move) => {
  return (dispatch, getState) => {
    const { game } = getState()

    if (Chess.isLegalMove(move, game)) {
      const newGame = Chess.createGame([...game.moves, move])
      dispatch(setGame(newGame))
      dispatch(sendLastMove(newGame))
    }
  }
}

export const startPromotion: (move: Chess.Move) => Thunk = (move: Chess.Move) => {
  return (dispatch, getState) => {
    const { game } = getState()

    const testMove: Chess.Move = Chess.copyMove(move)
    testMove.to.piece.type = 'Q'
    if (Chess.isLegalMove(testMove, game)) {
      dispatch(setPromoting(true))
      dispatch(setGame(Chess.createGame([...game.moves, move])))
    }
  }
}

export const finalizePromotion: (promotion: Chess.Move) => Thunk = (promotion: Chess.Move) => {
  return (dispatch, getState) => {
    const { promoting, game } = getState()

    if (!promoting) {
      return
    }

    const newGame = Chess.createGame([...game.moves.slice(0, -1), promotion])

    dispatch(setPromoting(false))
    dispatch(setGame(newGame))
    dispatch(sendLastMove(newGame))
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
