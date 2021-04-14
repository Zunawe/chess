import React, { FC } from 'react'

export interface PieceProps {
  color: 'D' | 'L'
  type: 'K' | 'Q' | 'R' | 'B' | 'N' | 'P'
}

export const Piece: FC<PieceProps> = ({ color, type }) => {
  return (
    <img className='piece' src={`/images/${color}${type}.svg`} />
  )
}
