import { IGameEntity } from './gameEntity'

export interface IGameRepository {
  getAllGames(): Promise<IGameEntity[]>
  startNewGame(game): Promise<IGameEntity>
  createNewGame(game): Promise<IGameEntity>
}
