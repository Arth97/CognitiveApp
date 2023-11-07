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
  name: String,
  time: Number
})
const BaseGameModel = model('game', BaseGameSchema)

const SentenceMemorySchema = new Schema({
  type: { type: String, default: 'SentenceMemory' },
  selectedWords: [String],
  sentenceToSave: [String]
})
const SentenceMemoryModel = model('SentenceMemory', SentenceMemorySchema)

// Discriminator para modelos que heredan de otro modelo
// const SentenceMemoryModel = BaseGameModel.discriminator(
//   'SentenceMemory',
//   SentenceMemorySchema
// )

export { BaseGameModel, SentenceMemoryModel }
