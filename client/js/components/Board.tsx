import React, { FC, useContext, useCallback, useMemo } from 'react'
import * as Chess from 'chess-utils'

import { AppContext } from '../context/app'
import { deselectPiece, stopPromotion } from '../context/actions/app'
import { PromotionSelector, Tile, TileProps } from './index'

export const Board: FC = () => {
  const [state, dispatch] = useContext(AppContext)
  const handleClick = useCallback(() => {
    if (!state.dragging) {
      dispatch(deselectPiece())
      dispatch(stopPromotion())
    }
  }, [state.dragging])
  const board = useMemo(() => {
    return Chess.getBoard(state.game)
  }, [state.game])

  const tiles: TileProps[][] = Array(8).fill(null).map((_, r) => {
    return Array(8).fill(null).map((_, c) => {
      return {
        rank: r,
        file: c,
        piece: null
      }
    })
  })

  for (const [coord, piece] of board.entries()) {
    if (piece === null) continue
    tiles[Chess.getRank(coord)][Chess.getFile(coord)].piece = piece
  }

  return (
    <div id='boardContainer'>
      <div id='board' className={state.perspective === 'D' ? 'flipped' : ''} onClick={handleClick}>
        {tiles.map((rank, r) => {
          return (
            <div className='rank' key={r}>
              {rank.map((tile) => {
                return (
                  <Tile {...tile} key={`${tile.rank}${tile.file}`} />
                )
              })}
            </div>
          )
        })}
      </div>
      <PromotionSelector />
    </div>

  )
}
