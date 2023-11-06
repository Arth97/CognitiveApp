import { IGameRepository } from '../../domain/game/gameRepository'
// import { GameValue } from '../../domain/game/gameValue'
import { GameDataContext } from './gameDataContext'
import { StrategyForSentenceMemory, StrategyForGameB } from './gameStrategy'

export class GameUseCase {
  constructor (
    private readonly _gameRepository: IGameRepository
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

  public saveNewGameData (gameData) {
    console.log('gamedata', gameData)
    const { type } = gameData

    const gameDataContext = new GameDataContext()

    if (type === 'sentenceMemory') {
      gameDataContext.setStrategy(new StrategyForSentenceMemory())
    } else if (type === 'GameB') {
      gameDataContext.setStrategy(new StrategyForGameB())
    } else {
      throw new Error('Unknown game type.')
    }

    return gameDataContext.saveNewGameData(gameData)
      .then((res) => { return res })
      .catch((err) => { throw err })
  }
}
