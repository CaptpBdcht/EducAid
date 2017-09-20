import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response, ResponseContentType }	from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ValidRequestData } from '../metadatas/api.metadatas';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiRequesterService {

  private apiUrl: string;

  constructor(
    private logger: LoggerService,
    private http: Http
  ) {
    this.apiUrl = environment.apiUrl;
  }

  public obtain(requestDatas: ValidRequestData): Promise<Response> {
    if (!this.validateRequest(requestDatas))
      return Promise.reject(null);

    const reqUrl = this.apiUrl + requestDatas.restUrl;
    const reqBody = this.buildBody(requestDatas);
    const reqMethod = requestDatas.method;
    const reqOptions = this.buildOptions(requestDatas);

    switch (reqMethod) {
      case RequestMethod.Get:
        return this.http.get(reqUrl, reqOptions).toPromise();

      case RequestMethod.Post:
        return this.http.post(reqUrl, reqBody, reqOptions).toPromise();

      case RequestMethod.Put:
        return this.http.put(reqUrl, reqBody, reqOptions).toPromise();

      case RequestMethod.Delete:
        return this.http.delete(reqUrl, reqOptions).toPromise();

      default:
        // Handle error - method is not available
        return Promise.reject(null);
    }
  }

  private buildOptions(requestDatas: ValidRequestData): RequestOptions {
    const options = new RequestOptions();
    const headers = this.createAuthorizationHeader();

    if (requestDatas.contentType)
      headers.append('Content-Type', requestDatas.contentType);

    options.headers = headers;

    if (requestDatas.responseType) {
      if (requestDatas.responseType === 'Blob')
        options.responseType = ResponseContentType.Blob;
    }

    return options;
  }

  private buildBody(requestDatas: ValidRequestData): any {
    if (!requestDatas.contentType){
      return requestDatas.body;
    }
    return JSON.stringify(requestDatas.body);
  }

  private createAuthorizationHeader(): Headers {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + localStorage.getItem('userToken'));
    return headers;
  }

  private validateRequest(requestDatas: ValidRequestData): boolean {
    let isValid = true;

    if (!requestDatas || !requestDatas.restUrl) {
      this.logger.log({
        class: 'APIRequesterService',
        method: 'validateRequest',
        message: 'Method or URL is missing from request datas',
        level: LogLevel.Warning
      });
      isValid = false;
    }

    if (this.isPostOrPutRequest(requestDatas.method) && !requestDatas.body) {
      this.logger.log({
        class: 'APIRequesterService',
        method: 'validateRequest',
        message: 'POST and PUT requests need a body',
        level: LogLevel.Warning
      });
      isValid = false;
    }

    return isValid;
  }

  private isPostOrPutRequest(method: RequestMethod): boolean {
    return (method === RequestMethod.Post || method === RequestMethod.Put);
  }
}
