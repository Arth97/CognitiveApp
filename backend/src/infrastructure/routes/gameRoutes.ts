import express from 'express'
import { GameController } from '../controllers/gameController'
import { MongoGameRepository } from '../repository/mongoRepository'
import { GameUseCase } from '../../application/gameUseCase'

const router = express.Router()

const gameRepo = new MongoGameRepository()
const gameUseCase = new GameUseCase(gameRepo)
const gameController = new GameController(gameUseCase)

router.get('/', gameController.getAllGames)
router.get('/:gameId', gameController.startNewGame)
router.post('/', gameController.createNewGame)

export default router
