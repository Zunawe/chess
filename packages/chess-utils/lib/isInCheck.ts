import { getBoard } from './getBoard'
import { getAttackedSpaces, Coordinates, coordinatesEqual, Color, Game } from './index'

export const isInCheck = (color: Color, game: Game): boolean => {
  const board = getBoard(game)

  const attackedSpaces = Object.entries(board)
    .filter(([, p]) => p.color !== color)
    .reduce<Coordinates[]>((acc, [c, p]) => {
    return [...acc, ...getAttackedSpaces({ coordinates: new Coordinates(c), piece: p }, game)]
  }, [])

  const kingLocation = Object.entries(board)
    .find(([, p]) => p.color === color && p.type === 'K')?.[0]

  if (kingLocation === undefined) {
    return false
  }

  return attackedSpaces.some((space) => coordinatesEqual(space, new Coordinates(kingLocation)))
}
