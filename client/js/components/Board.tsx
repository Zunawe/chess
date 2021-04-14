import React, { FC } from 'react'
import { Tile, TileProps } from './index'

interface BoardProps {
  perspective: 'D' | 'L'
}

export const Board: FC<BoardProps> = (props) => {
  const tiles: TileProps[][] = Array(8).fill(null).map((_, r) => {
    return Array(8).fill(null).map((_, c) => {
      return {
        rank: r,
        file: c,
        piece: null
      }
    })
  })

  tiles[0][1].piece = {
    type: 'P',
    color: 'D'
  }

  console.log(tiles)

  return (
    <div id='board'>
      {tiles.map((row, r) => {
        return (
          <div className='row' key={r}>
            {row.map((tile) => {
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
