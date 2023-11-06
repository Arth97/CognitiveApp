import { IGameDataStrategy } from '../../domain/game/gameRepository'

export class StrategyForSentenceMemory implements IGameDataStrategy {
  saveNewGameData (gameData: any): Promise<any> {
    // Lógica de guardado para el juego A
    return null
  }
}

export class StrategyForGameB implements IGameDataStrategy {
  saveNewGameData (gameData: any): Promise<any> {
    // Lógica de guardado para el juego B
    return null
  }
}
