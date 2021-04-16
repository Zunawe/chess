import React, { FC, useContext, useCallback } from 'react'

import { AppContext } from '../context/app'
import { Tile, TileProps } from './index'
import { deselectPiece } from '../context/actions/app'
import { Coordinates } from '../lib/chessUtils'

interface BoardProps {
  perspective: 'D' | 'L'
}

export const Board: FC<BoardProps> = (props) => {
  const [state, dispatch] = useContext(AppContext)
  const handleMouseUp = useCallback(() => {
    if (!state.dragging) {
      dispatch(deselectPiece())
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
    const c = new Coordinates(coord)
    tiles[c.rank][c.file].piece = piece
  }

  return (
    <div id='board' className={props.perspective === 'D' ? 'flipped' : ''} onMouseUp={handleMouseUp}>
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
  )
}
