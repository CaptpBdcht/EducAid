import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../metadatas/authentication.service';

@Injectable()
export abstract class RuleModelGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    const userInfo = JSON.parse(this.authService.getUserInfo());

    if (this.activationRule(userInfo)) {
      return true;
    }
    else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  public abstract activationRule(userInfo: any): boolean;  
}
