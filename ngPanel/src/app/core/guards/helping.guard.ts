import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { RuleModelGuard } from './rule-model.guard';

import { AuthenticationService } from '../metadatas/authentication.service';

import { UserRole } from '../../shared/models/user';

@Injectable()
export class HelpingGuard extends RuleModelGuard implements CanActivate {

  constructor(
    authService: AuthenticationService,
    router: Router
  ) {
    super(authService, router);
  }
  
  public activationRule(userInfo: any): boolean {
    return userInfo.role === UserRole[UserRole.STUDENT] ||
           userInfo.role === UserRole[UserRole.TEACHER];
  }
}
