import { Schema, model } from 'mongoose'
import { IUserEntity } from '../user/userEntity'

const UserSchema = new Schema<IUserEntity>({
  username: {
    type: String
    // unique: true
  }/* ,
  email: {
    type: String
    // unique: true
  } */
})

const UserModel = model<IUserEntity>('User', UserSchema)

export default UserModel
