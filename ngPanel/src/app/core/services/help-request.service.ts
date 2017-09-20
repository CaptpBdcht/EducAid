import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { IHelpRequest } from '../../shared/models/help-request';

@Injectable()
export class HelpRequestService extends ApiServiceModel {

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllPendingEvaluations(): Promise<IHelpRequest[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: '/api/helprequest/all/pendingeval/' + userInfo.id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IHelpRequest[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllHelpedByUserId(): Promise<IHelpRequest[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: '/api/helprequest/all/helped/' + userInfo.id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IHelpRequest[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllRequestsOnAllClassesByUserId(): Promise<IHelpRequest[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: '/api/helprequest/all/class/all/user/' + userInfo.id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IHelpRequest[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  create(classId: number, exerciceId: number): Promise<any> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: `/api/helprequest/` + userInfo.id + '/' + classId + '/' + exerciceId,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: {}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  updateHelper(requestId: number): Promise<void> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: '/api/helprequest/' + requestId + '/helper/' + userInfo.id,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: {}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  updateRating(rating: number, requestId: number): Promise<void> {
    const requestDatas = {
      restUrl: '/api/helprequest/' + requestId + '/rating/' + rating,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: {}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  deleteByAskerAndExercice(exerciceId: number): Promise<void> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: '/api/helprequest/' + userInfo.id + '/' + exerciceId,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'HelpRequestService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
