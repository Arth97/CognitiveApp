import { IUserEntity } from './userEntity'

export class UserValue implements IUserEntity {
  username: string
  email: string

  constructor (username: string, email: string) {
    this.username = username
    this.email = email
  }
}
