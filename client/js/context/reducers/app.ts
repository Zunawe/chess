import * as Chess from 'chess-utils'

import {
  ResetGameAction,
  SetGameAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction,
  SetPromotingAction,
  UndoLastMoveAction,
  ReplaceLastMoveAction,
  SetPerspectiveAction,
  SetColorAction
} from '../actions/app'
import { SetSocketAction } from '../actions/socket'

export const reducer: Reducer = (state, action) => {
  if (action instanceof UndoLastMoveAction) {
    return {
      ...state,
      game: Chess.createGame(state.game.moves.slice(0, -1))
    }
  } else if (action instanceof ReplaceLastMoveAction) {
    return {
      ...state,
      game: Chess.createGame([...state.game.moves.slice(0, -1), action.payload])
    }
  } else if (action instanceof ResetGameAction) {
    return {
      ...state,
      game: Chess.createGame()
    }
  } else if (action instanceof SetGameAction) {
    return {
      ...state,
      game: action.payload
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
  } else if (action instanceof SetPerspectiveAction) {
    return {
      ...state,
      perspective: action.payload
    }
  } else if (action instanceof SetSocketAction) {
    return {
      ...state,
      socket: action.payload
    }
  } else if (action instanceof SetColorAction) {
    return {
      ...state,
      color: action.payload
    }
  }
  return state
}
