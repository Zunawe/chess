import * as Chess from 'chess-utils'
import {
  ResetBoardAction,
  SetBoardAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction,
  AddMoveAction,
  SetPromotingAction,
  UndoLastMoveAction,
  ReplaceLastMoveAction
} from '../actions/app'

export const reducer: Reducer = (state, action) => {
  if (action instanceof AddMoveAction) {
    return {
      ...state,
      game: {
        ...state.game,
        moves: [...state.game.moves, action.payload]
      }
    }
  } else if (action instanceof UndoLastMoveAction) {
    const newMoves = state.game.moves.slice(0, -1)
    const newBoard = Chess.applyMoves(newMoves, Chess.getStartingBoard())
    return {
      ...state,
      game: {
        ...state.game,
        moves: newMoves,
        board: newBoard
      }
    }
  } else if (action instanceof ReplaceLastMoveAction) {
    const newMoves = [...state.game.moves.slice(0, -1), action.payload]
    const newBoard = Chess.applyMoves(newMoves, Chess.getStartingBoard())
    return {
      ...state,
      game: {
        ...state.game,
        moves: newMoves,
        board: newBoard
      }
    }
  } else if (action instanceof ResetBoardAction) {
    return {
      ...state,
      game: {
        ...state.game,
        board: Chess.getStartingBoard()
      }
    }
  } else if (action instanceof SetBoardAction) {
    return {
      ...state,
      game: {
        ...state.game,
        board: action.payload
      }
    }
  } else if (action instanceof SetDraggingAction) {
    return {
      ...state,
      dragging: action.payload
    }
  } else if (action instanceof SelectPieceAction) {
    return {
      ...state,
      selected: action.payload
    }
  } else if (action instanceof DeselectPieceAction) {
    return {
      ...state,
      selected: null
    }
  } else if (action instanceof SetPromotingAction) {
    return {
      ...state,
      promoting: action.payload
    }
  }
  return state
}
