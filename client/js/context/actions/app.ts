import { Action } from './Action'
// import { Thunk } from '../middlewares'

export class ResetBoardAction extends Action {}
export const resetBoard = (): ResetBoardAction => (new ResetBoardAction())

export class MovePieceAction extends Action {}
export const movePiece = (from: Coordinates, to: Coordinates): MovePieceAction => (new MovePieceAction({ from, to }))

export class RemovePieceAction extends Action {}
export const removePiece = (from: Coordinates): RemovePieceAction => (new RemovePieceAction(from))

export class SetPieceAction extends Action {}
export const setPiece = (at: Coordinates, piece: Piece): SetPieceAction => (new SetPieceAction({ at, piece }))
