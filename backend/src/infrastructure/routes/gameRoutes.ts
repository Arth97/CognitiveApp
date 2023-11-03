import express from 'express'

import { GameController } from '../controllers/gameController'
import { MongoGameRepository } from '../repository/mongoRepository'
import { GameStrategy } from '../adapters/gameAdapters'
import { GameUseCase } from '../../application/game/gameUseCase'

const router = express.Router()

const gameRepo = new MongoGameRepository()
const gameStrategy = new GameStrategy()
const gameUseCase = new GameUseCase(gameRepo, gameStrategy)
const gameController = new GameController(gameUseCase)

router.get('/', gameController.getAllGames)
router.get('/:gameId', gameController.startNewGame)
router.post('/', gameController.createNewGameData)

export default router
