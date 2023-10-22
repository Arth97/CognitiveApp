import { Schema, model } from 'mongoose'
import { IGameEntity } from '../../domain/game/gameEntity'

const GameSchema = new Schema<IGameEntity>({
  name: String,
  time: Number
})

const GameModel = model<IGameEntity>('game', GameSchema)

export default GameModel
