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
  gameName: { type: String, default: 'SentenceMemory' },
  selectedWords: [String],
  sentenceToSave: [String]
})
// Discriminator para modelos que heredan de otro modelo
const SentenceMemoryModel = BaseGameModel.discriminator('SentenceMemory', SentenceMemorySchema)

const WordListSchema = new Schema({
  gameName: String,
  listName: String,
  wordList: [String]
})
// Discriminator para modelos que heredan de otro modelo
const WordListModel = BaseGameModel.discriminator('WordList', WordListSchema)

export { BaseGameModel, SentenceMemoryModel, WordListModel }
