import { IGameDataStrategy, IGameRepository } from '../../domain/game/gameRepository'
// import { GameValue } from '../../domain/game/gameValue'
import { GameDataContext } from './gameDataContext'

export class GameUseCase {
  constructor (
    private readonly _gameRepository: IGameRepository,
    private readonly _gameDataStrategy: IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
    this._gameDataStrategy = _gameDataStrategy
  }

  public async getAllGames () {
    try {
      const allGames = await this._gameRepository.getAllGames()
      return allGames
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  public startNewGame () {
    let game
    return game
  }

  public createNewGameData (gameData) {
    const { type } = gameData

    const gameDataContext = new GameDataContext()

    if (type === 'GameA') {
      gameDataContext.setStrategy(new StrategyForGameA())
    } else if (type === 'GameB') {
      gameDataContext.setStrategy(new StrategyForGameB())
    } else {
      throw new Error('Unknown game type.')
    }

    return gameDataContext.saveGameData(gameData)
      .then((res) => { return res })
      .catch((err) => { throw err })
  }
}
