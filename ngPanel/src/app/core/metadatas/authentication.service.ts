import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';

import { LogLevel, LoggerService } from '../logs/logger.service';
import { ApiServiceModel } from '../metadatas/api-service-model';
import { ErrorResponse, ValidRequestData } from '../metadatas/api.metadatas';
import { LevelService } from '../services/level.service';
import { RouterHelperService } from '../metadatas/router-helper.service';
import { StudentService } from '../services/student.service';
import { UserService } from '../services/user.service';

import { LevelGrade } from '../../shared/models/level';
import { Credentials, StudentAdapter, UserRole, IUser, IStudent } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService extends ApiServiceModel {

  constructor(
    private http: Http,
    private levelService: LevelService,
    private logger: LoggerService,
    private routerHelper: RouterHelperService,
    private studentService: StudentService,
    private userService: UserService
  ) {
    super();
  }

  signIn(credentials: Credentials): Promise<IUser | string | {}> {
    const requestDatas = {
      restUrl: '/signin',
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: JSON.stringify(credentials)
    };
    
    const reqUrl = environment.apiUrl + requestDatas.restUrl;
    const reqBody = requestDatas.body;
    const reqOptions = this.buildOptions(requestDatas);

    return this.http.post(reqUrl, reqBody, reqOptions)
                    .toPromise()
                    .then((res: Response) => this.extractData(res))
                    .catch((err: Error) => this.handleError(err));
  }

  signOut(): Promise<Error | void> {
    const token = localStorage.getItem('userToken');

    const requestDatas = {
      restUrl: '/signout',
      method: RequestMethod.Post,
      contentType: 'application/json',
      body: JSON.stringify({ token: token })
    };

    const reqUrl = environment.apiUrl + requestDatas.restUrl;
    const reqBody = requestDatas.body;
    const reqOptions = this.buildOptions(requestDatas);
    
    return this.http.post(reqUrl, reqBody, reqOptions)
                    .toPromise()
                    .then(() => this.removeTokenAndLogout())
                    .catch((err: Error) => console.error(err));
  }

  protected removeTokenAndLogout(): Promise<Error> {
    this.emptyLocalStorage();
    this.routerHelper.goTo('/login');

    return Promise.reject('Successfully logged out');
  }

  protected extractData<IUser>(res: Response): Promise<IUser> {
    const user = res.json() || {};

    if (user && user.token) {
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.data.id,
        username: user.data.username,
        firstname: user.data.firstname,
        lastname: user.data.lastname,
        role: user.data.role
      }));

      localStorage.setItem('userToken', user.token);

      if (user.data.role === UserRole[UserRole.STUDENT]) {
        this.studentService.findLastByUserId(user.data.id)
        .then((students: IStudent[]) => this.initStudentInfo(students[0] as StudentAdapter))
        .catch((error: string) => console.error(error))
        .then((result) => {
          const studentInfo = localStorage.getItem('studentInfo');
          const student = JSON.parse(studentInfo);

          if (student.grade === LevelGrade[LevelGrade.FIRST])
            this.userService.setStorageKidPicture(user.data.id);
          else
            this.userService.setStorageAvatar(user.data.id);
        });
      } else
        this.userService.setStorageAvatar(user.data.id);

      return user.data;
    }
    else {
      return Promise.reject('No token found');
    }
  }

  public getUserInfo(): string {
    return localStorage.getItem('userInfo');
  }

  private initStudentInfo(student: StudentAdapter): Promise<any> {
    return new Promise((resolve, reject) => {
      const grade = this.levelService.getGradeByLevelName(student.levelName);

      localStorage.setItem('studentInfo', JSON.stringify({
        id: student.id,
        classId: student.classId,
        level: student.levelName,
        specialty: student.specialtyName,
        year: student.year,
        grade: grade
      }));

      resolve(true);
    });
  }

  protected handleError(error: ErrorResponse): Promise<string> {
    const errMsg = super.getErrorMessage(error);

    this.logger.log({
      class: 'AuthenticationService',
      method: 'handleError',
      message: errMsg,
      level: LogLevel.Error
    });

    return Promise.reject(errMsg);
  }

  protected buildOptions(requestDatas: ValidRequestData): RequestOptions {
    const options = new RequestOptions();
    const headers = new Headers();

    if (requestDatas && requestDatas.contentType) {
      headers.append('Content-Type', requestDatas.contentType);
      options.headers = headers;
    }

    return options;
  }

  private emptyLocalStorage(): void {
    localStorage.removeItem('classInfo');
    localStorage.removeItem('levelInfo');
    localStorage.removeItem('kidPicture');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
    localStorage.removeItem('studentInfo');
  }
}
