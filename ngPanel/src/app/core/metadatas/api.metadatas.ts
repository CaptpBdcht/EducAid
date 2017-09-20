import { RequestMethod, Response } from '@angular/http';

export type ErrorResponse = Response | any;

export interface ValidRequestData {
  restUrl: string;
  method: RequestMethod;
  contentType?: string;
  responseType?: string;
  body?: any;
}
