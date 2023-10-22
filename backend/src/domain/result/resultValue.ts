import { IResultEntity } from './resultEntity'

export class ResultValue implements IResultEntity {
  userId: string
  gameId: string
  score: number
  time: number

  constructor (userId: string, gameId: string, score: number, time: number) {
    this.userId = userId
    this.gameId = gameId
    this.score = score
    this.time = time
  }
}
