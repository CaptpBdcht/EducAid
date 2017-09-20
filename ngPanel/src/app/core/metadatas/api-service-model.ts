import { Response } from '@angular/http';

import { ErrorResponse } from './api.metadatas';

export abstract class ApiServiceModel {

  protected extractData(res: Response): Promise<any> {
    const body = res.json();
    return Promise.resolve(body);
  }
  
  protected abstract handleError(error: ErrorResponse): Promise<string>;

  protected getErrorMessage(error: ErrorResponse): string {
    if (error === null) {
      return `Error is null`;
    }
    else if (error instanceof Response) {
      const body = JSON.parse(error.json()) || '';
      const err = body.error || JSON.stringify(body);
      return `${ error.status } - ${ error.statusText || '' } : ${ err }`;
    }
    else
      return error.message || error.toString();
  }
}
