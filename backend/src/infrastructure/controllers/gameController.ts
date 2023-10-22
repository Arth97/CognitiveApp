import { GameUseCase } from '../../application/gameUseCase'

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

  public createNewGame = (req, res) => {
    try {
      const game = this._gameUseCase.createNewGame(req.body)
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
