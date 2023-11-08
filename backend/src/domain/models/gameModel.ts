import { Schema, model } from 'mongoose'
// import { IGameEntity } from '../../domain/game/gameEntity'

// const GameSchema = new Schema<IGameEntity>()

// const GameSchema = new Schema<IGameEntity>({
//   name: String,
//   time: Number,
//   challengeType: String
// })

// const GameModel = model<IGameEntity>('game', GameSchema)

// export default GameModel

const BaseGameSchema = new Schema({
  name: String
})
const BaseGameModel = model('Game', BaseGameSchema)

const SentenceMemorySchema = new Schema({
  name: { type: String, default: 'SentenceMemory' },
  selectedWords: [String],
  sentenceToSave: [String]
})
// Discriminator para modelos que heredan de otro modelo
const SentenceMemoryModel = BaseGameModel.discriminator('SentenceMemory', SentenceMemorySchema)

export { BaseGameModel, SentenceMemoryModel }
