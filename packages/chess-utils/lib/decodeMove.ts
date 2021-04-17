import { Move, PieceType, gameFromMoves, Piece, Coordinates } from '.'
import { createPiece } from './createPiece'
import { getLegalMoves } from './getLegalMoves'
import { movesEqual } from './movesEqual'
import { whoseTurn } from './whoseTurn'

export const decodeMove = (encodedMove: string, moves: Move[]): Move => {
  const currentGame = gameFromMoves(moves)
  const color = whoseTurn(moves)

  const [castleMatch, queenSide] = encodedMove.match(/^O-O(-O)?$/) ?? []
  if (castleMatch !== undefined) {
    const piece = createPiece('K', color)
    return {
      from: [new Coordinates(4, color === 'L' ? 0 : 7), piece],
      to: [new Coordinates(queenSide === undefined ? 6 : 2, color === 'L' ? 0 : 7), piece]
    }
  }

  let [
    /* match */,
    pieceType,
    dFile,
    dRank,
    /* capture */,
    toCoordinates,
    promotion
    /* check */
  ] = encodedMove.match(/^([QRBNK])?(?:([abcdefgh])?([12345678])?)?(x)?([abcdefgh][12345678])(=[QRBN])?(\+|#)?$/) ?? []

  if (pieceType === undefined) {
    pieceType = 'P'
  }

  const matchingPieces = Object.entries(currentGame.board)
    .filter(([, p]) => {
      return p.type === pieceType && p.color === color
    })
    .map<Move>(([c, p]) => ({
    from: [new Coordinates(c), p],
    to: [
      new Coordinates(toCoordinates),
      {
        color,
        type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
      }
    ]
  }))
    .filter((testMove) => {
      return getLegalMoves(testMove.from, currentGame).some((legalMove) => movesEqual(legalMove, testMove))
    })
    .map(({ from }) => from)

  let matchingPiece: [Coordinates, Piece]
  if (matchingPieces.length === 0) {
    throw new Error(`Could not find any valid pieces to reach square ${toCoordinates}`)
  } else {
    const disambiguatedPieces = matchingPieces.filter((match) => {
      const matchesFile = dFile === undefined || dFile === match[0].toString()[0]
      const matchesRank = dRank === undefined || dRank === match[0].toString()[1]

      return matchesFile && matchesRank
    })

    if (disambiguatedPieces.length === 0) {
      throw new Error(`No specified pieces could reach square ${toCoordinates}`)
    } else if (disambiguatedPieces.length > 1) {
      throw new Error('Could not disambiguate between multiple valid pieces')
    }

    matchingPiece = disambiguatedPieces[0]
  }

  return {
    from: matchingPiece,
    to: [
      new Coordinates(toCoordinates),
      {
        color,
        type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
      }
    ]
  }
}
