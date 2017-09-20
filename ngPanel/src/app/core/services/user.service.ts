import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';

import { ApiRequesterService } from '../metadatas/api-requester.service';
import { LogLevel, LoggerService } from '../logs/logger.service';
import { ApiServiceModel } from '../metadatas/api-service-model';
import { ErrorResponse } from '../metadatas/api.metadatas';

import { IUser } from '../../shared/models/user';

import 'rxjs/add/operator/map'; 

@Injectable()
export class UserService extends ApiServiceModel {

  url = '/api/user';

  constructor(
    private logger: LoggerService,
    private requester: ApiRequesterService
  ) {
    super();
  };

  getAvatar(userId: number): Promise<any> {
    const requestDatas = {
      restUrl: `${this.url}/${userId}/avatar`,
      method: RequestMethod.Get,
      responseType: 'Blob'
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.blob()) 
               .catch((err: ErrorResponse) => console.warn(err));
  }

  getStorageAvatar(): Promise<string> {
    const avatar = localStorage.getItem('userAvatar');

    return Promise.resolve(avatar);
  }

  getStorageUser(): Promise<IUser> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo.id)
      return Promise.reject({ error: 'No ID for current user' });
    else
      return this.getById(userInfo.id);
  }

  getById(id: string): Promise<IUser> {
    const requestDatas = {
      restUrl: `${this.url}/${id}`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IUser) 
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  getKidPictureByUserId(userId: number): Promise<any> {
    const requestDatas = {
      restUrl: `${this.url}/${userId}/kidPicture`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json())
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAll(): Promise<IUser[]> {
    const requestDatas = {
      restUrl: `${this.url}/all`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IUser[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllTeachers(): Promise<IUser[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/teacher`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IUser[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  findAllStudents(): Promise<IUser[]> {
    const requestDatas = {
      restUrl: `${this.url}/all/student`,
      method: RequestMethod.Get
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => res.json() as IUser[])
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  create(user: IUser): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: user
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  update(user: IUser): Promise<void> {
    const requestDatas = {
      restUrl: `${this.url}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: user
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  updateAvatar(avatarFile: File): Promise<boolean> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;
    const formData: any = new FormData();
    formData.append('File', avatarFile);

    const requestDatas = {
      restUrl: `${this.url}/${userId}/avatar`,
      method: RequestMethod.Put,
      body: formData
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => Promise.resolve(true))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  updateKidPicture(picture: string): Promise<void> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;

    const requestDatas = {
      restUrl: `${this.url}/${userId}/kidPicture`,
      method: RequestMethod.Put,
      body: { 'picture': picture }
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res))
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  updatePassword(password: string): Promise<void> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo.id;

    const requestDatas = {
      restUrl: `${this.url}/password/${userId}`,
      method: RequestMethod.Put,
      contentType: 'application/json',
      body: {
         'password': password
      }
    };

    return this.requester.obtain(requestDatas)
               .then((res: Response) => console.warn(res)) 
               .catch((err: ErrorResponse) => this.handleError(err));
  }

  setStorageAvatar(userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAvatar(userId)
      .then(avatar => {
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onloadend = () => {
          const base64Avatar = reader.result;
          localStorage.setItem('userAvatar', base64Avatar);
           resolve(true);
        };
      })
      .catch(err => {
        reject(false);
      });
    });
  }

  setStorageKidPicture(userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getKidPictureByUserId(userId)
      .then(result => {
        localStorage.setItem('kidPicture', result.kid_picture);
        resolve(true);  
      })
      .catch(err => {
        reject(false);
      });
    });
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

  protected extractData<IUser>(res: Response): Promise<IUser> {
    const user = res.json() || {};
    
    return user;
  }


  protected handleError(error: ErrorResponse): Promise<any> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'UserService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Error
    });

    return Promise.reject(errMsg);
  }
}
