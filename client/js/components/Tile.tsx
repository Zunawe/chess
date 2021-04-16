import React, { FC } from 'react'
import * as Chess from 'chess-utils'

import { Piece } from './index'

export interface TileProps {
  rank: number
  file: number
  piece?: null | Chess.Piece
}

export const Tile: FC<TileProps> = ({ rank, file, piece }) => {
  return (
    <div data-rank={rank} data-file={file} className={`tile tile--${(rank + file) % 2 === 0 ? 'dark' : 'light'}`}>
      {piece === undefined || piece === null ? null : <Piece color={piece.color} type={piece.type} coordinates={new Chess.Coordinates(file, rank)} />}
    </div>
  )
}
