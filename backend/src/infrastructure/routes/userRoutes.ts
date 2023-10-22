import express from 'express'

import { UserController } from '../controllers/userController'
import { UserUseCase } from '../../application/userUseCase'
import { MongoUserRepository } from '../repository/mongoRepository'

const router = express.Router()

// const userRepo = null
const userRepo = new MongoUserRepository()
const userUseCase = new UserUseCase(userRepo)
const userController = new UserController(userUseCase)

router.get('/:username', userController.getOneUser)
router.post('/', userController.createNewUser)
router.delete('/:username', userController.deleteOneUser)

export default router
