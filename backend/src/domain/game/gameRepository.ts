import { IGameEntity } from './gameEntity'

export interface IGameRepository {
  getAllGames(): Promise<IGameEntity[]>
  startNewGame(game): Promise<IGameEntity>
}

export interface IGameDataStrategy {
  saveGameData(gameData: any): Promise<any>;
}
