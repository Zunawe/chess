import http from 'http'
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import { Server, Socket } from 'socket.io'
import * as Chess from 'chess-utils'

import { httpLogger, errorLogger } from './middleware'
import { getRoomCode, logger } from './util'
import * as routes from './routes'
import * as RoomManager from './services/RoomManager'

const init = async (): Promise<void> => {
  logger.info('Starting server')

  const PORT = process.env.PORT ?? '8000'
  const app = express()

  const server = http.createServer(app)
  const io = new Server(server)

  // Middlewares
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet())
  }

  app.use(httpLogger)

  // Hot module replacement
  if (process.env.NODE_ENV === 'development') {
    try {
      const webpack = (await import('webpack')).default
      const webpackConfig = (await import(path.join(process.cwd(), 'webpack.dev'))).default

      const compiler = webpack(webpackConfig)

      const webpackDevMiddleware = (await import('webpack-dev-middleware')).default
      app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-only'
      }))

      const webpackHotMiddleware = (await import('webpack-hot-middleware')).default
      app.use(webpackHotMiddleware(compiler, {
        log: false,
        path: '/__webpack_hmr'
      }))
    } catch (error: any) {
      logger.error('Couldn\'t load webpack hot module replacement. Did you mean to run in production mode?')
    }
  }

  app.use(express.json())
  if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(process.cwd(), 'client', 'public')))
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist', 'client')))
  }

  // Routes
  app.use('/chess', routes.chess)

  app.use(errorLogger)

  // Sockets
  io.on('connect', (socket: Socket) => {
    socket.on('join', (roomCode, color) => {
      if (!RoomManager.roomExists(roomCode)) {
        RoomManager.createRoom(roomCode)
      }
      const room = RoomManager.getRoom(roomCode) as RoomManager.Room

      const availableColors = (['W', 'B'] as Chess.Color[])
        .filter((color) => room.players[color] === null)

      if (availableColors.length === 0) {
        socket.emit('full')
        return
      }

      if (color === null) {
        color = availableColors[0]
      } else if (!availableColors.includes(color)) {
        socket.emit('color taken')
      }

      RoomManager.addPlayer(roomCode, socket.id, color)

      void socket.join(roomCode) /* eslint-disable-line no-void */
      io.in(roomCode).emit('join')
      socket.emit('color', color)
    })

    socket.on('move', (move) => {
      const roomCode = getRoomCode(socket)
      if (roomCode === undefined) return

      const room = RoomManager.makeMove(roomCode, move)
      io.in(roomCode).emit('sync', Chess.serializeGame(room.game))
    })

    socket.on('sync', () => {
      const roomCode = getRoomCode(socket)
      if (roomCode === undefined) return

      const room = RoomManager.getRoom(roomCode)
      if (room === undefined) return

      socket.emit('sync', Chess.serializeGame(room.game))
    })

    socket.on('disconnecting', () => {
      const roomCode = getRoomCode(socket)
      if (roomCode === undefined) return

      RoomManager.removePlayer(roomCode, socket.id)

      io.in(roomCode).allSockets().then((sockets) => {
        if (sockets.size === 1) {
          RoomManager.removeRoom(roomCode)
        }
      }).catch((reason) => logger.error(reason))
    })
  })

  // Starting the server
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

init()
  .then(() => { })
  .catch((error) => { throw error })
