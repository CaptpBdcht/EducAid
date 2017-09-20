import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { LogLevel, LoggerService } from '../logs/logger.service';

import { ILevelHasSpecialty } from '../../shared/models/levelHasSpecialty';

@Injectable()
export class LevelHasSpecialtyService extends ApiServiceModel {

  url = '/api/levelHasSpecialty'; 

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllFormatted(): Promise<ILevelHasSpecialty[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/formatted`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ILevelHasSpecialty[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedById(id: Number): Promise<ILevelHasSpecialty[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/formatted/${id}`,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res = res.json() || {})
             .catch((err: Error) => this.handleError(err));
  }

  create(levelHasSpecialty: ILevelHasSpecialty): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: levelHasSpecialty
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(course: ILevelHasSpecialty): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: course
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
      class: 'CourseService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
