import React, { FC, useContext, useCallback } from 'react'
import * as Chess from 'chess-utils'

import { AppContext } from '../context/app'
import { deselectPiece, stopPromotion } from '../context/actions/app'
import { PromotionSelector, Tile, TileProps } from './index'

export const Board: FC = () => {
  const [state, dispatch] = useContext(AppContext)
  const handleMouseUp = useCallback(() => {
    if (!state.dragging) {
      dispatch(deselectPiece())
      dispatch(stopPromotion())
    }
  }, [state.dragging])

  const tiles: TileProps[][] = Array(8).fill(null).map((_, r) => {
    return Array(8).fill(null).map((_, c) => {
      return {
        rank: r,
        file: c,
        piece: null
      }
    })
  })

  for (const [coord, piece] of Object.entries(state.game.board)) {
    const c = new Chess.Coordinates(coord)
    tiles[c.rank][c.file].piece = piece
  }

  return (
    <div id='boardContainer'>
      <div id='board' className={state.perspective === 'D' ? 'flipped' : ''} onMouseUp={handleMouseUp}>
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
