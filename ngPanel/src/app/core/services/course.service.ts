import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';

import { ApiServiceModel } from '../metadatas/api-service-model';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { LogLevel, LoggerService } from '../logs/logger.service';

import { ICourse } from '../../shared/models/course';

@Injectable()
export class CourseService extends ApiServiceModel {

  url = '/api/course';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findAllFormatted(): Promise<ICourse[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/formatted`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ICourse[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findFormattedByCourseId(courseId: number): Promise<ICourse[]> {
    const requestDatas = {
      restUrl: `${this.url}/formatted/${courseId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ICourse[])
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByClassUserId(): Promise<ICourse[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: `${this.url}/all/formatted/class/user/${userInfo.id}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
            .then((res: Response) => res.json() as ICourse[] || {})
            .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByTeacherId(): Promise<ICourse[]> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const requestDatas = {
      restUrl: `${this.url}/all/formatted/${userInfo.id}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ICourse[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByClassId(classId: number): Promise<ICourse[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/formatted/class/${classId}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
             .then((res: Response) => res.json() as ICourse[] || {})
             .catch((err: Error) => this.handleError(err));
  }

  findAllFormattedByClassAndTeacherAndName(subjectname: String, classId: number, teacherId: number): 
  Promise<ICourse[]> {
    const requestDatas = {
      restUrl: '/api/course/all/class/'+classId+'/'+teacherId+'/'+subjectname,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as ICourse[])
              .catch((err: Error) => this.handleError(err));
  }

  create(course: ICourse): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: course
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(course: ICourse): Promise<void> {
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
