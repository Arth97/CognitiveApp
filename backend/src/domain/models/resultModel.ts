import { Schema, model } from 'mongoose'
import { IResultEntity } from '../result/resultEntity'

const ResultSchema = new Schema<IResultEntity>({
  // userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  // gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: String },
  gameId: { type: String },
  score: { type: Number/* , required: true  */ },
  time: { type: Number/* , required: true  */ }
})

// Probar si lo siguiente funcionaria igual
// const ResultSchema = new Schema<IResultEntity>()

const ResultModel = model<IResultEntity>('Result', ResultSchema)

export default ResultModel
