declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

declare interface State {
  game: import('chess-utils').Game
  color: import('chess-utils').Color
  dragging: boolean
  selected: number | null
  promoting: boolean
  socket: import('socket.io-client').Socket | null
}

declare interface Store {
  state: State
  dispatch: Dispatch
  getState: () => State
}

declare type Reducer = (state: State, action: Action) => State
declare type Dispatch = ((...args: any[]) => void)
declare type Middleware = (store: Store) => (next: Dispatch) => Dispatch
