import React, { FC, useCallback, useContext, useMemo, useState } from 'react'
import { setDragging, selectPiece } from '../context/actions/app'

import { AppContext } from '../context/app'

export interface PieceProps {
  color: 'D' | 'L'
  type: 'K' | 'Q' | 'R' | 'N' | 'B' | 'P'
  coordinates: Coordinates
}

export const Piece: FC<PieceProps> = ({ color, type, coordinates }) => {
  const [state, dispatch] = useContext(AppContext)
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)

  const startDrag = useCallback((e) => {
    dispatch(setDragging(true))
    dispatch(selectPiece(coordinates))

    const x = e.target.offsetLeft
    const y = e.target.offsetTop

    setDx(e.clientX - x)
    setDy(e.clientY - y)
  }, [])

  const drag = useCallback((e) => {
    if (state.dragging) {
      const x = e.target.offsetLeft
      const y = e.target.offsetTop

      setDx(e.clientX - x)
      setDy(e.clientY - y)
    }
  }, [state.dragging])

  const endDrag = useCallback(() => {
    dispatch(setDragging(false))
  }, [])

  const selected = useMemo(() => {
    return state.selected?.rank === coordinates.rank && state.selected?.file === coordinates.file
  }, [state.selected])

  return (
    <img
      style={selected && state.dragging ? {
        transform: `translate(calc(${dx}px - 5vmin), calc(${dy}px - 5vmin))`
      } : {}}
      draggable='false'
      className={`piece ${state.dragging ? 'dragging' : ''}`}
      src={`/images/${color}${type}.svg`}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
    />
  )
}
