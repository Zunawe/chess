import React, { FC, useCallback, useContext, useMemo, useState } from 'react'

import { setDragging, selectPiece, movePiece } from '../context/actions/app'
import { AppContext } from '../context/app'
import { Coordinates, coordinatesEqual } from '../lib/util'

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

  const endDrag = useCallback((e) => {
    dispatch(setDragging(false))

    e.target.hidden = true
    const hoveredTile = document.elementFromPoint(e.clientX, e.clientY)
    e.target.hidden = false

    if (hoveredTile !== null) {
      const tile = hoveredTile as HTMLElement
      if (tile.dataset.rank !== undefined && tile.dataset.file !== undefined) {
        const r = Number.parseInt(tile.dataset.rank)
        const f = Number.parseInt(tile.dataset.file)
        dispatch(movePiece(coordinates, new Coordinates(f, r)))
      }
    }
  }, [])

  const isSelected = useMemo(() => {
    return state.selected !== null && coordinatesEqual(new Coordinates(state.selected), coordinates)
  }, [state.selected])

  return (
    <img
      data-rank={coordinates.rank}
      data-file={coordinates.file}
      style={isSelected && state.dragging ? {
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
