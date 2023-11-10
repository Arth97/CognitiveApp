import { GameUseCase } from '../../application/game/gameUseCase'

export class GameController {
  constructor (private readonly _gameUseCase: GameUseCase) {
    this._gameUseCase = _gameUseCase
  }

  public getAllGames = (req, res) => {
    try {
      const allGames = this._gameUseCase.getAllGames()
      res.status(200).send({
        status: 'OK',
        data: { data: allGames }
      })
    } catch (err) {
      res.status(err?.status || 500).send({
        status: 'FAILED',
        data: { error: err?.message || err }
      })
    }
  }

  public startNewGame = (req, res) => {
    try {
      const game = this._gameUseCase.startNewGame()
      res.status(200).send({
        status: 'OK',
        data: { data: game }
      })
    } catch (err) {
      res.status(err?.status || 500).send({
        status: 'FAILED',
        data: { error: err?.message || err }
      })
    }
  }

  public getGameDataByName = async (req, res) => {
    try {
      const gameData = await this._gameUseCase.getGameDataByName(req.params)
      res.status(200).send({
        status: 'OK',
        data: { data: gameData }
      })
    } catch (err) {
      res.status(err?.status || 500).send({
        status: 'FAILED',
        data: { error: err?.message || err }
      })
    }
  }

  public saveNewGameData = (req, res) => {
    try {
      const game = this._gameUseCase.saveNewGameData(req.body.data)
      res.status(200).send({
        status: 'OK',
        data: { data: game }
      })
    } catch (err) {
      res.status(err?.status || 500).send({
        status: 'FAILED',
        data: { error: err?.message || err }
      })
    }
  }
}
