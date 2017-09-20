import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { Teacher } from '../../shared/models/teacher';

@Injectable()
export class TeacherService extends ApiServiceModel {

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findById(userId: Number): Promise<Teacher> {
    const requestDatas = {
      restUrl: '/api/teacher/' + userId,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as Teacher)
              .catch((err: Error) => this.handleError(err));
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
}
