import { Board, Game, createGame, deserializeMove } from '.'

export const deserializeGame = (serializedGame: string, initialBoard?: Board): Game => {
  return createGame(serializedGame.split(':').filter((m) => m !== '').map(deserializeMove), initialBoard)
}
