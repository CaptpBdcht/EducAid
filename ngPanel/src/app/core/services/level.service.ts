import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { ILevel, LevelGrade } from '../../shared/models/level';

@Injectable()
export class LevelService extends ApiServiceModel {

  private url: string = '/api/level';

  private firstGrade: string[] = [
    'CP',
    'CE1',
    'CE2',
    'CM1',
    'CM2'
  ];

  private secondGrade: string[] = [
    '6e',
    '5e',
    '4e',
    '3e',
    '2nde',
    '1ère',
    'Terminale'
  ];

  private supriorGrade: string[] = [
    'L1',
    'L2',
    'L3',
    'M1',
    'M2'
  ];

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllByName(name: string): Promise<ILevel[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/name/${name}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ILevel[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAll(): Promise<ILevel[]> {
    const requestDatas = {
      restUrl: `${this.url}/all`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as ILevel[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  create(level: ILevel): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: level
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(level: ILevel): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: level
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  delete(id: number): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}/${id}`,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'LevelService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }

  /*protected extractSingleOccurence(res: Response): ILevel {
    const response = res.json();
    if (response.length === 0){
      return null;
    }
    return response[0] as ILevel;
  }*/

  getGradeByLevelName(levelName: string): string {
    if (this.firstGrade.includes(levelName))
      return LevelGrade[LevelGrade.FIRST];

    if (this.secondGrade.includes(levelName))
      return LevelGrade[LevelGrade.SECOND];

    if (this.supriorGrade.includes(levelName))
      return LevelGrade[LevelGrade.SUPERIOR];

    return LevelGrade[LevelGrade.NONE];
  }
}
