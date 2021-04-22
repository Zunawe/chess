import React, { FC, useCallback, useContext, useMemo } from 'react'
import * as Chess from 'chess-utils'
import { AppContext } from '../context/app'
import { finalizePromotion } from '../context/actions/app'

export const PromotionSelector: FC = () => {
  const [state, dispatch] = useContext(AppContext)
  const lastMove = useMemo(() => state.game.moves[state.game.moves.length - 1], [state.game.moves])

  const handleClick = useCallback((piece) => () => {
    const promotion = Chess.copyMove(lastMove)
    promotion.to.piece.type = piece
    dispatch(finalizePromotion(promotion))
  }, [lastMove])

  if (!state.promoting) {
    return null
  }

  const promotionPieces: Chess.PieceType[] = ['Q', 'R', 'B', 'N']
  return (
    <div
      className={[
        'promotionSelector',
        `${state.color === lastMove.from.piece.color ? 'top' : 'bottom'}`,
        `col-${state.color === 'L' ? Chess.getFile(lastMove.to.coords) : 7 - Chess.getFile(lastMove.to.coords)}`
      ].join(' ')}
    >
      {promotionPieces.map((piece) => (
        <div
          key={piece}
          className={`pieceButton ${lastMove.from.piece.color}${piece}`}
          onClick={handleClick(piece)}
        />
      ))}
    </div>
  )
}
