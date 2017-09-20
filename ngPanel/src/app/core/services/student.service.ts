import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { LogLevel, LoggerService } from '../logs/logger.service';

import { IStudent } from '../../shared/models/user';

@Injectable()
export class StudentService extends ApiServiceModel {

  url: '/api/student';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAll(): Promise<IStudent[]> {
    const requestDatas = {
      restUrl: `${this.url}/all`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IStudent[])
              .catch((err: Error) => this.handleError(err));
  }

  findAllByClassId(id: number): Promise<IStudent[]> {
    const requestDatas = {
      restUrl: '/api/student/all/' + id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IStudent[])
              .catch((err: Error) => this.handleError(err));
  }

  findLastByUserId(id: number): Promise<IStudent[]> {
    const requestDatas = {
      restUrl: '/api/student/' + id + '/last',
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IStudent[])
              .catch((err: Error) => this.handleError(err));
  }

  create(userId: number, classId: number): Promise<void> {
    const requestDatas = {
      restUrl: `/api/student/` + userId + '/' + classId,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: {}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  delete(userId: number, classId: number): Promise<void> {
    const requestDatas = {
      restUrl: `/api/student/` + userId + '/' + classId,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'StudentService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
