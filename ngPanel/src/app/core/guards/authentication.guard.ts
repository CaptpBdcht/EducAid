import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  public canActivate(): boolean {
    if (!!localStorage.getItem('userToken')) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
