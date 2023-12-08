import { IGameDataStrategy, IGameRepository } from '../../domain/game/gameRepository'
import { WordListModel, SentenceMemoryModel } from '../../domain/models/gameModel'

export class StrategyForSentenceMemory implements IGameDataStrategy {
  constructor (
    private readonly _gameRepository: IGameRepository,
    private readonly _gameStrategyRepository: IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
    this._gameStrategyRepository = _gameStrategyRepository
  }

  getGameDataByName (model: any, gameName: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async saveNewGameData (_, gameData): Promise<any> {
    try {
      await this._gameRepository.getGameDataByName('SentenceMemory')
      return this._gameStrategyRepository.saveNewGameData(SentenceMemoryModel, gameData)
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}

export class StrategyForWordList implements IGameDataStrategy {
  constructor (
    private readonly _gameRepository: IGameRepository,
    private readonly _gameStrategyRepository: IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
    this._gameStrategyRepository = _gameStrategyRepository
  }

  async saveNewGameData (_, gameData): Promise<any> {
    try {
      const dataToUpdate = await this._gameRepository.getGameDataByName(gameData.gameName)
      const index = dataToUpdate.findIndex((data) => data.listName === gameData.listName)
      if (index === -1) { return this._gameStrategyRepository.saveNewGameData(WordListModel, gameData) }
      const options = {
        filter: { _id: dataToUpdate[index]._id },
        update: { $addToSet: { wordList: gameData.wordList } }
      }
      return this._gameStrategyRepository.updateGameData(WordListModel, options)
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}

export class StrategyForGameB implements IGameDataStrategy {
  constructor (
    private readonly _gameRepository: IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
  }

  getGameDataByName (model: any, gameName: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  saveNewGameData (gameData: any): Promise<any> {
    // Lógica de guardado para el juego B
    return null
  }
}
