import { Move, PieceType, Game, MovePart, getBoard, decodeFile, decodeRank, getFile, getRank } from '.'
import { decodeCoords, toCoords } from './coordinates'
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
      from: { coords: toCoords(4, color === 'L' ? 0 : 7), piece },
      to: { coords: toCoords(queenSide === undefined ? 6 : 2, color === 'L' ? 0 : 7), piece }
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

  const matchingPieces: MovePart[] = []
  for (const [c, p] of board.entries()) {
    if (p === null || p.type !== pieceType || p.color !== color) {
      continue
    }

    const testMove: Move = {
      from: { coords: c, piece: p },
      to: {
        coords: decodeCoords(toCoordinates),
        piece: {
          color,
          type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
        }
      }
    }

    if (getLegalMoves(testMove.from, game).some((legalMove) => movesEqual(legalMove, testMove))) {
      matchingPieces.push(testMove.from)
    }
  }

  let matchingPiece: MovePart
  if (matchingPieces.length === 0) {
    throw new Error(`Could not find any valid pieces to reach square ${toCoordinates}`)
  } else {
    const disambiguatedPieces = matchingPieces.filter((match) => {
      const matchesFile = dFile === undefined || decodeFile(dFile) === getFile(match.coords)
      const matchesRank = dRank === undefined || decodeRank(dRank) === getRank(match.coords)

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
      coords: decodeCoords(toCoordinates),
      piece: {
        color,
        type: (promotion === undefined ? pieceType : promotion[1]) as PieceType
      }
    }
  }
}
