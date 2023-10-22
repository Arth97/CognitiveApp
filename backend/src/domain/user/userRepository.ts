import { IUserEntity } from './userEntity'

export interface IUserRepository {
  getOneUser(username: string): Promise<IUserEntity>
  createNewUser(user: IUserEntity): Promise<IUserEntity>
  deleteOneUser(username: string): Promise<boolean>
}
