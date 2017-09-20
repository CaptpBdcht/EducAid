import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

@Injectable()
export class StudentExerciceService extends ApiServiceModel {

  url = '/api/studentexe';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findMark(exerciceId: number): Promise<any> {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const requestDatas = {
      restUrl: `${this.url}/${studentInfo.id}/${exerciceId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json())
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findCourseEvolution(courseId: number): Promise<any> {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const requestDatas = {
      restUrl: `${this.url}/evolution/${studentInfo.id}/${courseId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json())
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  create(exerciceId: number, score: number, maxScore: number): Promise<void> {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const requestDatas = {
      restUrl: `${this.url}/${studentInfo.id}/${exerciceId}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: { mark: score, maxMark: maxScore }
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(exerciceId: number, score: number, maxScore: number): Promise<void> {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const requestDatas = {
      restUrl: `${this.url}/${studentInfo.id}/${exerciceId}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: { mark: score, maxMark: maxScore }
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'StudentExerciceService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
