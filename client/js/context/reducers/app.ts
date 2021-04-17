import * as Chess from 'chess-utils'
import {
  ResetBoardAction,
  SetBoardAction,
  SetGameAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction,
  AddMoveAction,
  SetPromotingAction,
  UndoLastMoveAction,
  ReplaceLastMoveAction,
  SetRoomAction,
  SetPerspectiveAction
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
    const newGame = Chess.applyMoves(newMoves, {
      board: Chess.getStartingBoard(),
      moves: []
    })
    return {
      ...state,
      game: newGame
    }
  } else if (action instanceof ReplaceLastMoveAction) {
    const newMoves = [...state.game.moves.slice(0, -1), action.payload]
    const newGame = Chess.applyMoves(newMoves, {
      board: Chess.getStartingBoard(),
      moves: []
    })
    return {
      ...state,
      game: newGame
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
  } else if (action instanceof SetRoomAction) {
    return {
      ...state,
      room: action.payload
    }
  } else if (action instanceof SetPerspectiveAction) {
    return {
      ...state,
      perspective: action.payload
    }
  }
  return state
}
