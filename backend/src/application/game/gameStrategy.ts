import { IGameDataStrategy } from '../../domain/game/gameRepository'

export class StrategyForGameA implements IGameDataStrategy {
  saveGameData (gameData: any): Promise<any> {
    // Lógica de guardado para el juego A
    return null
  }
}

export class StrategyForGameB implements IGameDataStrategy {
  saveGameData (gameData: any): Promise<any> {
    // Lógica de guardado para el juego B
    return null
  }
}
