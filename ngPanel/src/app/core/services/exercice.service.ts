import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { IExercice } from '../../shared/models/qcm';

@Injectable()
export class ExerciceService extends ApiServiceModel {

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllByCourseId(id: number): Promise<IExercice[]> {
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const requestDatas = {
      restUrl: `/api/exercice/all/` + studentInfo.id + `/course/` + id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IExercice[])
              .catch((err: Error) => this.handleError(err));
  }

  findAllInCourseId(id: number): Promise<IExercice[]> {
    const requestDatas = {
      restUrl: `/api/exercice/all/incourse/` + id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IExercice[])
              .catch((err: Error) => this.handleError(err));
  }

  findAllNotInCourseId(courseId: number, subjectId: number): Promise<IExercice[]> {
    const requestDatas = {
      restUrl: `/api/exercice/all/outcourse/` + courseId + '/' + subjectId,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IExercice[])
              .catch((err: Error) => this.handleError(err));
  }

  findQCMByExerciceId(exerciceId: number): Promise<any> {
    const requestDatas = {
      restUrl: `/api/exercice/qcm/` + exerciceId,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IExercice[])
              .catch((err: Error) => this.handleError(err));
  }

  create(exerciceId: number, courseId: number): Promise<void> {
    const requestDatas = {
      restUrl: `/api/exercice/` + exerciceId + '/' + courseId,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: {}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  delete(exerciceId: number): Promise<void> {
    const requestDatas = {
      restUrl: `/api/exercice/exe/` + exerciceId ,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  deleteExerciceCourse(exerciceId: number, courseId: number): Promise<void> {
    const requestDatas = {
      restUrl: `/api/exercice/` + exerciceId + '/' + courseId,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'ExerciceService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
