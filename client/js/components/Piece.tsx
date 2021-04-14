import React, { FC, useCallback, useState } from 'react'

export interface PieceProps {
  color: 'D' | 'L'
  type: 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'
}

export const Piece: FC<PieceProps> = ({ color, type }) => {
  const [dragging, setDragging] = useState(false)
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)

  const startDrag = useCallback((e) => {
    setDragging(true)

    const x = e.target.offsetLeft
    const y = e.target.offsetTop

    setDx(e.clientX - x)
    setDy(e.clientY - y)
  }, [])

  const drag = useCallback((e) => {
    if (dragging) {
      const x = e.target.offsetLeft
      const y = e.target.offsetTop

      setDx(e.clientX - x)
      setDy(e.clientY - y)
    }
  }, [dragging])

  const endDrag = useCallback(() => {
    setDragging(false)
  }, [])

  return (
    <img
      style={dragging ? {
        transform: `translate(calc(${dx}px - 5vmin), calc(${dy}px - 5vmin))`
      } : {}}
      draggable='false'
      className='piece'
      src={`/images/${color}${type}.svg`}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
    />
  )
}
