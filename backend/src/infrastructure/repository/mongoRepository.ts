import { IGameEntity } from '../../domain/game/gameEntity'
import { IGameDataStrategy, IGameRepository } from '../../domain/game/gameRepository'
import { IUserEntity } from '../../domain/user/userEntity'
import { IUserRepository } from '../../domain/user/userRepository'
import { IResultEntity } from '../../domain/result/resultEntity'
import { IResultRepository } from '../../domain/result/resultRepository'
import { BaseGameModel } from '../../domain/models/gameModel'
import UserModel from '../../domain/models/userModel'
import ResultModel from '../../domain/models/resultModel'

/**
*   USER REPOSITORY
*/
// #region
class MongoUserRepository implements IUserRepository {
  async getOneUser (usrname: string): Promise<IUserEntity> {
    try {
      const user = await UserModel.findOne({ username: usrname }).exec()
      return user
    } catch (err) {
      console.log('err', err)
      // Or internal server error? TODO: check
      throw new Error(`Can not find user with username: ${usrname}`)
    }
  }

  async createNewUser (user: IUserEntity): Promise<IUserEntity> {
    try {
      const userCreated = await UserModel.create(user)
      return userCreated
    } catch (err) {
      console.log('err', err)
      throw new Error('Internal server error')
    }
  }

  async deleteOneUser (usrname): Promise<boolean> {
    try {
      const { deletedCount } = await UserModel.deleteOne({ username: usrname })
      return (deletedCount !== 0)
    } catch (err) {
      console.log('err', err)
      throw new Error('Internal server error')
    }
  }
}
// #endregion

/**
*   GAME REPOSITORY
*/
// #region
class MongoGameRepository implements IGameRepository, IGameDataStrategy {
  getAllGames (): Promise<IGameEntity[]> {
    // try {
    //   const allGames = GameModel.find()
    //   return allGames
    // } catch (err) {
    //   console.log('err', err)
    //   throw new Error('Internal server error')
    // }
    throw new Error('Method not implemented.')
  }

  startNewGame (gameId): Promise<IGameEntity> {
    // try {
    //   const game = GameModel.findOne({ _id: gameId })
    //   return game
    // } catch (err) {
    //   console.log('err', err)
    //   throw new Error('Internal server error')
    // }
    throw new Error('Method not implemented.')
  }

  async getGameDataByName (gameName): Promise<any> {
    try {
      // const result = await model.find({ name: gameName })
      const result = await BaseGameModel.findOne({ name: gameName })
      console.log('Datos encontrados:', result)
      return result
    } catch (error) {
      console.error('Error al buscar datos:', error)
    }
  }

  async saveNewGameData (model, gameData): Promise<any> {
    try {
      return await model.create(gameData)
    } catch (err) {
      console.log('err', err)
      throw new Error('Internal server error')
    }
  }

  async updateGameData (model: any, options: any): Promise<any> {
    try {
      console.log('GameDataToUpdate', options)
      const result = await model.updateOne(options.filter, options.update)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
}
// #endregion

/**
*   RESULT REPOSITORY
*/
// #region
class MongoResultRepository implements IResultRepository {
  saveNewResult (result: IResultEntity): Promise<IResultEntity> {
    try {
      return ResultModel.create(result)
    } catch (err) {
      console.log('err', err)
      throw new Error('Internal server error')
    }
  }

  async getUserScores ({ userId, gameId }): Promise<IResultEntity[]> {
    try {
      const scores = await ResultModel.find({ userId, gameId }).exec()
      return scores
    } catch (err) {
      console.log('err', err)
      throw new Error(`Error fetching user scores: ${err.message}`)
    }
  }

  async getTotalScores ({ gameId }): Promise<IResultEntity[]> {
    try {
      const scores = await ResultModel.find({ gameId })
      // const scores = await ResultModel.find({ gameId: 'wordMemory' })
      return scores
    } catch (err) {
      console.log('err', err)
      throw new Error(`Error fetching total scores: ${err.message}`)
    }
  }
}
// #endregion

export {
  MongoUserRepository,
  MongoGameRepository,
  MongoResultRepository
}
