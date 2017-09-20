import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

@Injectable()
export class CourseHasDocumentService extends ApiServiceModel {

  url = '/api/courseHasDocument';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  create(courseid: number, documentid: number): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: {courseId: courseid, documentId: documentid}
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  deleteDocumentCourse(documentId: number, courseId: number): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`+'/' + documentId + '/' + courseId,
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
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
