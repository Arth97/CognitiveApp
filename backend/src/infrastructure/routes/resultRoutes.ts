
import express from 'express'

import { ResultController } from '../controllers/resultController'
import { MongoResultRepository } from '../repository/mongoRepository'
import { ResultUseCase } from '../../application/resultUseCase'

const router = express.Router()

const resultRepo = new MongoResultRepository()
const resultUseCase = new ResultUseCase(resultRepo)
const resultController = new ResultController(resultUseCase)

// router.get('/', resultController.getAllResults)
// router.get('/:resultId', resultController.startNewResult)
router.post('/', resultController.saveResult)
router.get('/:gameId/:userId', resultController.getUserScores)
router.get('/:gameId', resultController.getTotalScores)

export default router
