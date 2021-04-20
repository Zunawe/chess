import React, { FC, useCallback, useContext, useMemo, useState } from 'react'

import { setDragging, selectPiece, makeMove, attemptPromotion } from '../context/actions/app'
import { AppContext } from '../context/app'
import * as Chess from 'chess-utils'
import { useSocket } from '../hooks/useSocket'

export interface PieceProps {
  color: Chess.Color
  type: Chess.PieceType
  coordinates: number
}

export const Piece: FC<PieceProps> = ({ color, type, coordinates }) => {
  const [state, dispatch] = useContext(AppContext)
  const [dx, setDx] = useState(0)
  const [dy, setDy] = useState(0)
  const socket = useSocket()

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

    if (Chess.whoseTurn(state.game) !== state.perspective) {
      return
    }

    e.target.hidden = true
    const hoveredTile = document.elementFromPoint(e.clientX, e.clientY)
    e.target.hidden = false

    if (hoveredTile !== null) {
      const tile = hoveredTile as HTMLElement
      if (tile.dataset.rank !== undefined && tile.dataset.file !== undefined) {
        const r = Number.parseInt(tile.dataset.rank)
        const f = Number.parseInt(tile.dataset.file)

        const move: Chess.Move = {
          from: { coords: coordinates, piece: { color, type } },
          to: { coords: Chess.toCoords(f, r), piece: { color, type } }
        }

        if (type === 'P' && (r === 0 || r === 7)) {
          dispatch(attemptPromotion(move))
        } else {
          dispatch(makeMove(move, (newGame) => {
            if (state.room !== '') socket.emit('move', state.room, Chess.encodeMove(newGame.moves.length - 1, newGame))
          }))
        }
      }
    }
  }, [color, type, state.room, state.game])

  const isSelected = useMemo(() => {
    return state.selected !== null && state.selected === coordinates
  }, [state.selected])

  return (
    <div
      data-rank={Chess.getRank(coordinates)}
      data-file={Chess.getFile(coordinates)}
      style={isSelected && state.dragging ? {
        transform: `translate(calc(${dx}px - 5vmin), calc(${dy}px - 5vmin))`
      } : {}}
      draggable='false'
      className={`piece ${color}${type} ${state.dragging ? 'dragging' : ''}`}
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseLeave={drag}
      onMouseUp={endDrag}
    />
  )
}
