import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { IQCM } from '../../shared/models/qcm';
import { IQCMQuestion } from '../../shared/models/qcm-question';

@Injectable()
export class QCMService extends ApiServiceModel {

  url = '/api/qcm';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllQCM(): Promise<IQCM[]> {
    const requestDatas = {
      restUrl: `${this.url}/all`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IQCM[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllQCMQuestions(qcmId: number): Promise<IQCMQuestion[]> {
    const requestDatas = {
      restUrl: `${this.url}/question/all/${qcmId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IQCMQuestion[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  create(qcm: IQCM): Promise<void> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;

    const requestDatas = {
      restUrl: `${this.url}/${userId}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: qcm
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'QCMService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
