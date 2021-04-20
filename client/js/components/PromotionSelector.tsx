import React, { FC, useCallback, useContext, useMemo } from 'react'
import * as Chess from 'chess-utils'
import { AppContext } from '../context/app'
import { replaceLastMove, setPromoting } from '../context/actions/app'

export const PromotionSelector: FC = () => {
  const [state, dispatch] = useContext(AppContext)
  const lastMove = useMemo(() => state.game.moves[state.game.moves.length - 1], [state.game.moves])

  const handleClick = useCallback((piece) => () => {
    const promotion = Chess.copyMove(lastMove)
    promotion.to.piece.type = piece
    dispatch(setPromoting(false))
    dispatch(replaceLastMove(promotion))
  }, [lastMove])

  if (!state.promoting) {
    return null
  }

  const promotionPieces: Chess.PieceType[] = ['Q', 'R', 'B', 'N']
  return (
    <div
      className={[
        'promotionSelector',
        `${state.perspective === lastMove.from.piece.color ? 'top' : 'bottom'}`,
        `col-${state.perspective === 'L' ? Chess.getFile(lastMove.to.coords) : 7 - Chess.getFile(lastMove.to.coords)}`
      ].join(' ')}
    >
      {promotionPieces.map((piece) => (
        <div
          key={piece}
          className={`pieceButton ${lastMove.from.piece.color}${piece}`}
          // src={`/images/${lastMove.from[1].color}${piece}.svg`}
          onClick={handleClick(piece)}
        />
      ))}
    </div>
  )
}
