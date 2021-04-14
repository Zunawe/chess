declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

declare interface Coordinates {
  rank: number
  file: number
}

declare interface Piece {
  color: 'D' | 'L'
  type: 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'
  coordinates: Coordinates
}

declare interface State {
  board: Piece[]
  dragging: boolean
  selected: null | Coordinates
}

declare interface Store {
  state: State
  dispatch: Dispatch
  getState: () => State
}

declare type Reducer = (state: State, action: Action) => State
declare type Dispatch = ((value: any) => void)
declare type Middleware = (store: Store) => (next: Dispatch) => Dispatch
