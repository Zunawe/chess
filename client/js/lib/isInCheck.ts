import { getAttackedSpaces } from './getAttackedSpaces'
import { Coordinates, coordinatesEqual } from './util'

export const isInCheck = (color: Color, moves: Move[], board: Board): boolean => {
  const attackedSpaces = Object.entries(board)
    .filter(([, p]) => p.color !== color)
    .reduce<Coordinates[]>((acc, [c, p]) => {
    return [...acc, ...getAttackedSpaces([new Coordinates(c), p], moves, board)]
  }, [])

  const kingLocation = Object.entries(board)
    .find(([, p]) => p.color === color && p.type === 'K')?.[0]

  if (kingLocation === undefined) {
    return false
  }

  return attackedSpaces.some((space) => coordinatesEqual(space, new Coordinates(kingLocation)))
}
