import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { RuleModelGuard } from './rule-model.guard';

import { AuthenticationService } from '../metadatas/authentication.service';

import { LevelGrade } from '../../shared/models/level';
import { UserRole } from '../../shared/models/user';

@Injectable()
export class MyPictureGuard extends RuleModelGuard implements CanActivate {

  constructor(
    authService: AuthenticationService,
    router: Router
  ) {
    super(authService, router);
  }
  
  public activationRule(userInfo: any): boolean {
    if (userInfo.role === UserRole[UserRole.STUDENT]) {
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      
      if (studentInfo.grade === LevelGrade[LevelGrade.FIRST])
        return true;
      else
        return false;
    } else
      return false;
  }
}
