import { Move, Coordinates } from './index'

export const copyMove = (move: Move): Move => {
  return {
    from: [new Coordinates(move.from[0].file, move.from[0].rank), { ...move.from[1] }],
    to: [new Coordinates(move.to[0].file, move.to[0].rank), { ...move.to[1] }]
  }
}
