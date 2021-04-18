import path from 'path'
import { RequestHandler } from 'express'

import { logger } from '../util'

export const get: RequestHandler = (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'client', 'index.html'), (err) => {
    if (err !== undefined) {
      logger.error(err)
    }
  })
}

export const getFile: RequestHandler = (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'client', req.params.file), (err) => {
    if (err !== undefined) {
      logger.error(err)
    }
  })
}
