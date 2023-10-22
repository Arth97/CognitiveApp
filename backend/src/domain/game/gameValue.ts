import { IGameEntity } from './gameEntity'

export class GameValue implements IGameEntity {
  name: string
  time: number
  hints: number
  challengesNumber: number

  constructor (name: string, time: number) {
    this.name = name
    this.time = time
  }
}
