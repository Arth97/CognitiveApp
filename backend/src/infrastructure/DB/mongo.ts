import { connect } from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const dbInit = () => {
  connect(MONGO_URI).then(() => {
    console.log('Mongo DataBase connected')
  }).catch(err => {
    console.error('Err', err)
  })
}

export default dbInit
