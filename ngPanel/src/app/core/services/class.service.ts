import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { IClass } from '../../shared/models/class';

@Injectable()
export class ClassService extends ApiServiceModel {

  url = '/api/class';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllFormatted(): Promise<IClass[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/formatted`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res = res.json() || {})
             .catch((err: Error) => this.handleError(err));
  }

  findFormattedByClassId(classId: number): Promise<IClass[]> {
    const requestDatas = {
      restUrl: `${this.url}/formatted/${classId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as IClass[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByTeacherId(): Promise<any> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: `${this.url}/all/formatted/${userInfo.id}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as IClass[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByUserId(userId: Number): Promise<IClass[]> {
    const requestDatas = {
      restUrl: '/api/class/all/formated/user/' + userId,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res = res.json() || {})
             .catch((err: Error) => this.handleError(err));
  }

  create(clazz: IClass): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: clazz
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(clazz: IClass): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: clazz
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
      class: 'ClassService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
