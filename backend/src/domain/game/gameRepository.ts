import { IGameEntity } from './gameEntity'

export interface IGameRepository {
  getAllGames(): Promise<IGameEntity[]>
  startNewGame(game): Promise<IGameEntity>
  getGameDataByName(gameName): Promise<any>
}

export interface IGameDataStrategy {
  saveNewGameData(model, gameData: any): Promise<any>;
}
