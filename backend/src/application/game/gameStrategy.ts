import { IGameDataStrategy } from '../../domain/game/gameRepository'
import { SentenceMemoryModel } from '../../domain/models/gameModel'

export class StrategyForSentenceMemory implements IGameDataStrategy {
  constructor (
    private readonly _gameRepository: IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
  }

  getGameDataByName (model: any, gameName: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async saveNewGameData (_, gameData): Promise<any> {
    try {
      await this._gameRepository.getGameDataByName(SentenceMemoryModel, 'SentenceMemory')
      return this._gameRepository.saveNewGameData(SentenceMemoryModel, gameData)
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
