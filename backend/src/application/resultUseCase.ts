
import { IResultRepository } from '../domain/result/resultRepository'

export class ResultUseCase {
  constructor (private readonly _resultRepository: IResultRepository) {
    this._resultRepository = _resultRepository
  }

  public saveResult (data) {
    // Terminar la lógica para guardar el resultado en el repositorio
    try {
      return this._resultRepository.saveNewResult(data)
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  // Desarrollar
  public async getUserScores (data) {
    try {
      let scores = await this._resultRepository.getUserScores(data)
      scores = countNumberOccurrences(scores)
      return scores
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  public async getTotalScores (data) {
    try {
      let scores = await this._resultRepository.getTotalScores(data)
      scores = countNumberOccurrences(scores)
      return scores
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}

function countNumberOccurrences (numbers) {
  const uniqueScores = {}

  numbers.forEach(scoreObj => {
    const { score } = scoreObj
    uniqueScores[score] = true
  })
  console.log('uniqueScores', uniqueScores)

  const scoresArray = Object.keys(uniqueScores).map(Number)
  console.log('scoresArray', scoresArray)

  const occurrences = {}

  numbers.forEach(scoreObj => {
    const { score } = scoreObj
    occurrences[score] = (occurrences[score] || 0) + 1
  })

  const result = []
  for (let i = 0; i <= 40; i++) {
    result.push(occurrences[i] || 0)
  }

  return result
}
