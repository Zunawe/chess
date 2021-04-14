import {
  RemovePieceAction,
  MovePieceAction,
  ResetBoardAction,
  SetPieceAction,
  SetDraggingAction,
  SelectPieceAction,
  DeselectPieceAction
} from '../actions/app'

export const reducer: Reducer = (state, action) => {
  if (action instanceof RemovePieceAction) {
    const i = state.board.findIndex((piece) => {
      return piece.coordinates.rank === action.payload.rank &&
        piece.coordinates.file === action.payload.file
    })

    if (i === -1) {
      return state
    }

    return {
      ...state,
      board: [
        ...state.board.slice(0, i),
        ...state.board.slice(i + 1)
      ]
    }
  } else if (action instanceof MovePieceAction) {
    const i = state.board.findIndex((piece) => {
      return piece.coordinates.rank === action.payload.from.rank &&
        piece.coordinates.file === action.payload.from.file
    })

    if (i === -1) {
      return state
    }

    return {
      ...state,
      board: [
        ...state.board.slice(0, i),
        {
          ...state.board[i],
          coordinates: action.payload.to
        },
        ...state.board.slice(i + 1)
      ]
    }
  } else if (action instanceof SetPieceAction) {
    const i = state.board.findIndex((piece) => {
      return piece.coordinates.rank === action.payload.from.rank &&
        piece.coordinates.file === action.payload.from.file
    })
    return {
      ...state,
      board: [
        ...state.board.slice(0, i),
        {
          ...state.board[i],
          type: action.payload.piece.type,
          color: action.payload.piece.color
        },
        ...state.board.slice(i + 1)
      ]
    }
  } else if (action instanceof ResetBoardAction) {
    return {
      ...state,
      board: [
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 0 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 1 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 2 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 3 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 4 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 5 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 6 } },
        { color: 'L', type: 'P', coordinates: { rank: 1, file: 7 } },
        { color: 'L', type: 'R', coordinates: { rank: 0, file: 0 } },
        { color: 'L', type: 'N', coordinates: { rank: 0, file: 1 } },
        { color: 'L', type: 'B', coordinates: { rank: 0, file: 2 } },
        { color: 'L', type: 'Q', coordinates: { rank: 0, file: 3 } },
        { color: 'L', type: 'K', coordinates: { rank: 0, file: 4 } },
        { color: 'L', type: 'B', coordinates: { rank: 0, file: 5 } },
        { color: 'L', type: 'N', coordinates: { rank: 0, file: 6 } },
        { color: 'L', type: 'R', coordinates: { rank: 0, file: 7 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 0 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 1 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 2 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 3 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 4 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 5 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 6 } },
        { color: 'D', type: 'P', coordinates: { rank: 6, file: 7 } },
        { color: 'D', type: 'R', coordinates: { rank: 7, file: 0 } },
        { color: 'D', type: 'N', coordinates: { rank: 7, file: 1 } },
        { color: 'D', type: 'B', coordinates: { rank: 7, file: 2 } },
        { color: 'D', type: 'Q', coordinates: { rank: 7, file: 3 } },
        { color: 'D', type: 'K', coordinates: { rank: 7, file: 4 } },
        { color: 'D', type: 'B', coordinates: { rank: 7, file: 5 } },
        { color: 'D', type: 'N', coordinates: { rank: 7, file: 6 } },
        { color: 'D', type: 'R', coordinates: { rank: 7, file: 7 } }
      ]
    }
  } else if (action instanceof SetDraggingAction) {
    return {
      ...state,
      dragging: action.payload
    }
  } else if (action instanceof SelectPieceAction) {
    return {
      ...state,
      selected: {
        ...action.payload
      }
    }
  } else if (action instanceof DeselectPieceAction) {
    return {
      ...state,
      selected: null
    }
  }
  return state
}
