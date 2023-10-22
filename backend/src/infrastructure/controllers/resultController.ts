
import { ResultUseCase } from '../../application/resultUseCase'

export class ResultController {
  private readonly _resultUseCase: ResultUseCase

  constructor (resultUseCase: ResultUseCase) {
    this._resultUseCase = resultUseCase
  }

  public saveResult = async (req, res) => {
    try {
      // const { userId, gameId, score, time } = req.body.data
      // const result = await this._resultUseCase.saveResult({ userId, gameId, score, time })
      const result = await this._resultUseCase.saveResult(req.body.data)
      res.status(201).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  public getUserScores = async (req, res) => {
    try {
      const { userId, gameId, score, time } = req.params
      const result = await this._resultUseCase.getUserScores({ userId, gameId, score, time })
      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  public getTotalScores = async (req, res) => {
    try {
      const { userId, gameId, score, time } = req.params
      const result = await this._resultUseCase.getTotalScores({ userId, gameId, score, time })
      res.status(200).json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
