import { getAttackedSpaces, Coordinates, coordinatesEqual } from './index'

export const isInCheck = (color: Color, game: Game): boolean => {
  const { board } = game
  const attackedSpaces = Object.entries(board)
    .filter(([, p]) => p.color !== color)
    .reduce<Coordinates[]>((acc, [c, p]) => {
    return [...acc, ...getAttackedSpaces([new Coordinates(c), p], game)]
  }, [])

  const kingLocation = Object.entries(board)
    .find(([, p]) => p.color === color && p.type === 'K')?.[0]

  if (kingLocation === undefined) {
    return false
  }

  return attackedSpaces.some((space) => coordinatesEqual(space, new Coordinates(kingLocation)))
}
