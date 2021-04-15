declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

declare interface Coordinates {
  rank: number
  file: number
}

declare type Color = 'D' | 'L'
declare type PieceType = 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'

declare interface Piece {
  color: Color
  type: PieceType
  coordinates: Coordinates
}

declare interface Move {
  piece: Piece
  to: Coordinates
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
