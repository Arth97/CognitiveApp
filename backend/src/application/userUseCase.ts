
import { IUserEntity } from '../domain/user/userEntity'
import { IUserRepository } from '../domain/user/userRepository'
import { UserValue } from '../domain/user/userValue'

export class UserUseCase {
  constructor (private readonly _userRepository: IUserRepository) {
    this._userRepository = _userRepository
  }

  public getOneUser = ({ username }) => {
    try {
      const user = this._userRepository.getOneUser(username)
      return user
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  public createNewUser ({ username, email }) {
    try {
      const userToInsert: IUserEntity = new UserValue(username, email)
      const newUser = this._userRepository.createNewUser(userToInsert)
      return newUser
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }

  public async deleteOneUser ({ username }) {
    try {
      const deletedUser = this._userRepository.deleteOneUser(username)
      return deletedUser
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}
