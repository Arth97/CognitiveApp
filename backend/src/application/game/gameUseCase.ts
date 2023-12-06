import { IGameDataStrategy, IGameRepository } from '../../domain/game/gameRepository'
// import { GameValue } from '../../domain/game/gameValue'
import { GameDataContext } from './gameDataContext'
import { StrategyForSentenceMemory, StrategyForGameB, StrategyForWordList } from './gameStrategy'

export class GameUseCase {
  constructor (
    private readonly _gameRepository: IGameRepository & IGameDataStrategy
  ) {
    this._gameRepository = _gameRepository
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

  public async getGameDataByName ({ gameName }) {
    try {
      const allGames = await this._gameRepository.getGameDataByName(gameName)
      return allGames
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  public saveNewGameData (gameData) {
    const { gameName } = gameData

    const gameDataContext = new GameDataContext()

    if (gameName === 'sentenceMemory') {
      gameDataContext.setStrategy(new StrategyForSentenceMemory(this._gameRepository, this._gameRepository))
    } else if (gameName === 'messyLetters' || gameName === 'wordMemory') {
      gameDataContext.setStrategy(new StrategyForWordList(this._gameRepository, this._gameRepository))
    } else if (gameName === 'GameB') {
      gameDataContext.setStrategy(new StrategyForGameB(this._gameRepository))
    } else {
      throw new Error('Unknown game type.')
    }

    return gameDataContext.saveNewGameData(gameData)
      .then((res) => { return res })
      .catch((err) => { throw err })
  }
}
