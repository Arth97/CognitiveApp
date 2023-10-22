import { IResultEntity } from './resultEntity'

export interface IResultRepository {
  saveNewResult(result: IResultEntity): Promise<IResultEntity>;
  getUserScores(result: IResultEntity): Promise<IResultEntity[]>;
  getTotalScores(result: IResultEntity): Promise<IResultEntity[]>;
}
