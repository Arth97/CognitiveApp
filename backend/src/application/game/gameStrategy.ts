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
    console.log('datos recibidos por argumento', gameData)

    // !!! PRIORITARIO
    // TODO: En vez de recuperar por ID, hacerlo por nombre de juego, se sacan multiples conjuntos
    // TODO: y se filtra por conjunto, si el conjunto existe, se actualiza, sino se crea uno nuevo
    try {
      const dataToUpdate = await this._gameRepository.getGameDataByName(gameData.name)
      console.log('dataToUpdate', dataToUpdate[0])
      if (!dataToUpdate[0]) { return this._gameStrategyRepository.saveNewGameData(WordListModel, gameData) }

      const options = {
        filter: { _id: dataToUpdate[0]._id },
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
