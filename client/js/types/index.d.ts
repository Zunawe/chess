declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

declare interface State {
  game: import('chess-utils').Game
  dragging: boolean
  selected: null | number
  promoting: boolean
  perspective: import('chess-utils').Color
  room: string
}

declare interface Store {
  state: State
  dispatch: Dispatch
  getState: () => State
}

declare type Reducer = (state: State, action: Action) => State
declare type Dispatch = ((value: any) => void)
declare type Middleware = (store: Store) => (next: Dispatch) => Dispatch
