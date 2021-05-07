import * as Chess from 'chess-utils'
import { gameFromPgn } from 'chess-utils'
import { calculateScore } from './calculateScore'

export const findBestMove = (game: Chess.Game, maxDepth: number): Chess.Move => {
  // let alpha = Number.NEGATIVE_INFINITY
  // let beta = Number.POSITIVE_INFINITY

  const bestMove = (game: Chess.Game, depth: number, alpha: number, beta: number): [string[], number] => {
    if (depth === maxDepth) {
      return [[], calculateScore(game)]
    }

    const turn = Chess.whoseTurn(game)
    const compare = turn === 'W'
      ? (a: number, b: number): boolean => a > b
      : (a: number, b: number): boolean => a < b
    const worstScore = turn === 'W' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

    const moves = Chess.getAllLegalMoves(game)
    if (moves.length === 0) {
      return [[], calculateScore(game)]
    }

    let score: number = worstScore
    let bestMoves: string[] = []
    for (let i = 0; i < moves.length; ++i) {
      const move = moves[i]
      const childGame = Chess.createGame([...game.moves, move], game.initialBoard)
      const [childMoves, childScore] = bestMove(childGame, depth + 1, alpha, beta)
      
      score = compare(score, childScore) ? score : childScore
      bestMoves = compare(score, childScore) ? bestMoves : [Chess.serializeMove(move), ...childMoves]

      if (turn === 'W') {
        alpha = alpha > score ? alpha : score
      } else {
        beta = beta < score ? beta : score
      }
      if (alpha >= beta) break
    }

    return [bestMoves, score]

    // const found = moves
    //   .map<[string, Chess.Game]>((move) => [Chess.serializeMove(move), Chess.createGame([...game.moves, move], game.initialBoard)])
    //   .map<[string[], number]>(([move, childGame]) => {
    //     const [followingMoves, score] = bestMove(childGame, depth + 1)
    //     return [[move, ...followingMoves], score]
    //   })
    //   .reduce((best, current) => compare(best[1], current[1]) ? best : current, [['NOT_FOUND'], worstScore])

    // return found
  }

  return Chess.deserializeMove(bestMove(game, 0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)[0][0])
}

const xor = (a: boolean, b: boolean): boolean => {
  return a || b && !(a && b)
}
