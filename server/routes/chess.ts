import express from 'express'

import { chess as controller } from '../controllers'

const router = express.Router()

router.get('/*', controller.get)

export { router }
