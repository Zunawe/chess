import * as Chess from 'chess-utils'
import {
  ResetBoardAction,
  SetBoardAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction,
  AddMoveAction
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
  }
  return state
}
