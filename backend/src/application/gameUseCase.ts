import { IGameRepository } from '../domain/game/gameRepository'
import { GameValue } from '../domain/game/gameValue'

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

  public createNewGame (gameData) {
    const { name, time } = gameData
    const game = new GameValue(name, time)
    return this._gameRepository.createNewGame(game)
      .then((res) => { return res })
      .catch((err) => { throw err })
  }
}
