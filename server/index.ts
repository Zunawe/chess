import http from 'http'
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import { Server } from 'socket.io'
import * as Chess from 'chess-utils'

import { httpLogger, errorLogger } from './middleware'
import { logger } from './util'
import * as routes from './routes'
import * as GameManager from './services/GameManager'

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
  app.use('/', routes.root)

  app.use(errorLogger)

  // Sockets
  io.on('connect', (socket) => {
    socket.on('join', (code) => {
      if (!GameManager.gameExists(code)) {
        GameManager.createGame(code)
      }

      io.in(code).allSockets().then((sockets) => {
        if (sockets.size < 2) {
          const color = sockets.size === 0 ? 'L' : 'D'
          void socket.join(code) /* eslint-disable-line no-void */
          socket.emit('joined', code, color)
        } else {
          socket.emit('full', code)
        }
      }).catch((reason) => logger.error(reason))
    })

    socket.on('move', (code, move) => {
      const game = GameManager.makeMove(code, move)
      io.in(code).emit('sync', Chess.encodeGame(game))
    })

    socket.on('disconnecting', () => {
      socket.rooms.forEach((room) => {
        if (room === socket.id) return
        io.in(room).allSockets().then((sockets) => {
          if (sockets.size === 1) {
            GameManager.removeGame(room)
          }
        }).catch((reason) => logger.error(reason))
      })
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
