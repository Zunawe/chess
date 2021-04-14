import React, { FC } from 'react'

import { Piece } from './index'

export interface TileProps {
  rank: number
  file: number
  piece?: null | {
    color: 'D' | 'L'
    type: 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'
  }
}

export const Tile: FC<TileProps> = ({ rank, file, piece }) => {
  return (
    <div className={`tile tile--${(rank + file) % 2 === 0 ? 'dark' : 'light'}`}>
      {piece === undefined || piece === null ? null : <Piece color={piece.color} type={piece.type} />}
    </div>
  )
}
