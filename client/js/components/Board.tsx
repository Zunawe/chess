import React, { FC, useContext } from 'react'

import { AppContext } from '../context/app'
import { Tile, TileProps } from './index'

interface BoardProps {
  perspective: 'D' | 'L'
}

export const Board: FC<BoardProps> = (props) => {
  const [state] = useContext(AppContext)

  const tiles: TileProps[][] = Array(8).fill(null).map((_, r) => {
    return Array(8).fill(null).map((_, c) => {
      return {
        rank: r,
        file: c,
        piece: null
      }
    })
  })

  state.board.forEach((piece) => {
    tiles[piece.coordinates.rank][piece.coordinates.file].piece = piece
  })

  return (
    <div id='board' className={props.perspective === 'D' ? 'flipped' : ''}>
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
