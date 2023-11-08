import { IGameEntity } from './gameEntity'

export interface IGameRepository {
  getAllGames(): Promise<IGameEntity[]>
  startNewGame(game): Promise<IGameEntity>
}

export interface IGameDataStrategy {
  getGameDataByName(model, gameName): Promise<any>
  saveNewGameData(model, gameData: any): Promise<any>;
}
