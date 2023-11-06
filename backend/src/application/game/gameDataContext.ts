import { IGameDataStrategy } from '../../domain/game/gameRepository'
// import { GameValue } from '../../domain/game/gameValue'

export class GameDataContext {
  private strategy: IGameDataStrategy

  setStrategy (strategy: IGameDataStrategy) {
    this.strategy = strategy
  }

  saveNewGameData (gameData: any): Promise<any> {
    if (!this.strategy) {
      throw new Error('Strategy not set.')
    }
    return this.strategy.saveNewGameData(gameData)
  }
}
