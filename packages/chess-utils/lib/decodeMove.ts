import { Move, PieceType, Game, MovePart, Coordinates, getBoard } from '.'
import { createPiece } from './createPiece'
import { getLegalMoves } from './getLegalMoves'
import { movesEqual } from './movesEqual'
import { whoseTurn } from './whoseTurn'

export const decodeMove = (encodedMove: string, game: Game): Move => {
  const board = getBoard(game)
  const color = whoseTurn(game)

  const [castleMatch, queenSide] = encodedMove.match(/^O-O(-O)?$/) ?? []
  if (castleMatch !== undefined) {
    const piece = createPiece('K', color)
    return {
      from: { coordinates: new Coordinates(4, color === 'L' ? 0 : 7), piece },
      to: { coordinates: new Coordinates(queenSide === undefined ? 6 : 2, color === 'L' ? 0 : 7), piece }
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

  const matchingPieces = Object.entries(board)
    .filter(([, p]) => {
      return p.type === pieceType && p.color === color
    })
    .map<Move>(([c, p]) => ({
    from: { coordinates: new Coordinates(c), piece: p },
    to: {
      coordinates: new Coordinates(toCoordinates),
      piece: {
        color,
        type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
      }
    }
  }))
    .filter((testMove) => {
      return getLegalMoves(testMove.from, game).some((legalMove) => movesEqual(legalMove, testMove))
    })
    .map(({ from }) => from)

  let matchingPiece: MovePart
  if (matchingPieces.length === 0) {
    throw new Error(`Could not find any valid pieces to reach square ${toCoordinates}`)
  } else {
    const disambiguatedPieces = matchingPieces.filter((match) => {
      const matchesFile = dFile === undefined || dFile === match.coordinates.toString()[0]
      const matchesRank = dRank === undefined || dRank === match.coordinates.toString()[1]

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
    to: {
      coordinates: new Coordinates(toCoordinates),
      piece: {
        color,
        type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
      }
    }
  }
}
