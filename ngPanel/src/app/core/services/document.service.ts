import { Injectable } from '@angular/core';
import { RequestMethod, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ErrorResponse } from '../metadatas/api.metadatas';
import { ApiRequesterService } from '../metadatas/api-requester.service';
import { ApiServiceModel } from '../metadatas/api-service-model';

import { IDocument, Document } from '../../shared/models/document';

@Injectable()
export class DocumentService extends ApiServiceModel {

  url = '/api/document';

  constructor(
    private requester: ApiRequesterService,
    private logger: LoggerService
  ) {
    super();
  }

  findPrivateByCourseId(courseId: number): Promise<Document[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/private/course/`
                + courseId,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as Document[])
              .then((res: Document[]) => Document.fromJSONArray(res))
              .catch((err: Error) => this.handleError(err));
  }

  findAllBySubjectId(subjectId: Number): Promise<Document[]>{
    const requestDatas = {
      restUrl: `${this.url}/all/public/subject/` + subjectId,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as Document[])
              .then((res: Document[]) => Document.fromJSONArray(res))
              .catch((err: Error) => this.handleError(err));
  }

  findAllInCourseId(id: number): Promise<IDocument[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/incourse/` + id,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IDocument[])
              .catch((err: Error) => this.handleError(err));
  }

  findAllNotInCourseId(courseId: number, subjectId: number): Promise<IDocument[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/outcourse/` + courseId + '/' + subjectId,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as IDocument[])
              .catch((err: Error) => this.handleError(err));
  }

  findAllUnclassified(): Promise<Document[]>{
    const requestDatas = {
      restUrl: `${this.url}/all/public/unclassified`,
      method: RequestMethod.Get,
      contentType: 'application/json'
    };

    return this.requester.obtain(requestDatas)
              .then((res: Response) => res.json() as Document[])
              .then((res: Document[]) => Document.fromJSONArray(res))
              .catch((err: Error) => this.handleError(err));
  }
  
  upload(documentFile: File, path: string): Promise<boolean>{
    const formData: any = new FormData();
    formData.append('File', documentFile);
    const requestDatas = {
      restUrl: `${this.url}/upload/`+path,
      method: RequestMethod.Post,
      body: formData
    };
    return this.requester.obtain(requestDatas)
               .then((res: Response) => true)
               .catch((err: ErrorResponse) => this.handleError(err));
  }
  
  create(newName: string, newURL: string, newIsPublic: boolean): Promise<number> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: {name: newName, URL: newURL, isPublic: newIsPublic}
    };
    
    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as number)
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  delete(documentId: number, URL: string): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}/` + documentId +'/'+encodeURIComponent(URL),
      method: RequestMethod.Delete
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'DocumentService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Warning
    });

    return Promise.reject(errMsg);
  }
}
