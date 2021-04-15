declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

declare type Color = 'D' | 'L'
declare type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'

declare interface Piece {
  color: Color
  type: PieceType
}

declare interface Board {
  [key: string]: Piece | undefined
}

declare interface Move {
  from: [import('../lib/util').Coordinates, Piece]
  to: [import('../lib/util').Coordinates, Piece]
}

declare interface State {
  board: Board
  dragging: boolean
  selected: null | string
}

declare interface Store {
  state: State
  dispatch: Dispatch
  getState: () => State
}

declare type Reducer = (state: State, action: Action) => State
declare type Dispatch = ((value: any) => void)
declare type Middleware = (store: Store) => (next: Dispatch) => Dispatch
