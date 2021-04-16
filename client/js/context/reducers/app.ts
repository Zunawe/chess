import { coordinatesEqual, getStartingBoard } from '../../lib/util'
import {
  RemovePieceAction,
  MovePieceAction,
  ResetBoardAction,
  SetBoardAction,
  SetPieceAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction
} from '../actions/app'

export const reducer: Reducer = (state, action) => {
  if (action instanceof RemovePieceAction) {
    const newBoard = { ...state.game.board }
    delete newBoard[action.payload.toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */

    return {
      ...state,
      game: {
        ...state.game,
        board: newBoard
      }
    }
  } else if (action instanceof MovePieceAction) {
    if (coordinatesEqual(action.payload.to, action.payload.from)) {
      return state
    }

    const newBoard = {
      ...state.game.board
    }
    newBoard[action.payload.to.toString()] = state.game.board[action.payload.from.toString()]
    delete newBoard[action.payload.from.toString()] /* eslint-disable-line @typescript-eslint/no-dynamic-delete */

    return {
      ...state,
      game: {
        ...state.game,
        board: newBoard
      },
      selected: null
    }
  } else if (action instanceof SetPieceAction) {
    const newBoard = {
      ...state.game.board
    }

    newBoard[action.payload.from.toString()] = action.payload.piece
    return {
      ...state,
      game: {
        ...state.game,
        board: newBoard
      }
    }
  } else if (action instanceof ResetBoardAction) {
    return {
      ...state,
      game: {
        ...state.game,
        board: getStartingBoard()
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
