import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { ISubject } from '../../shared/models/subject';

@Injectable()
export class SubjectService extends ApiServiceModel {

  url = '/api/subject';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAll(): Promise<ISubject[]> {
    const requestDatas = {
      restUrl: `${this.url}/all`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as ISubject[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllByTeacherId(): Promise<ISubject[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: `${this.url}/all/teacher/` + userInfo.id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as ISubject[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllBySubjectName(subjectname: String): Promise<ISubject[]> {
    const requestDatas = {
      restUrl: '/api/subject/all/public/name/' + subjectname,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as ISubject[])
              .catch((err: Error) => this.handleError(err));
  }

  create(level: ISubject): Promise<void> {
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

  update(level: ISubject): Promise<void> {
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
      class: 'SubjectService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
