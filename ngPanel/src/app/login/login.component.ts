import { Component } from '@angular/core';

import { LogLevel, LoggerService } from '../core/logs/logger.service';
import { AuthenticationService } from '../core/metadatas/authentication.service';
import { RouterHelperService } from '../core/metadatas/router-helper.service';
import { Credentials } from '../shared/models/user';

@Component({
  selector: 'educaid-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent {

  errorMessage = '';
  model = new Credentials('Admin', 'admin');

  constructor(
    private authService: AuthenticationService,
    private logger: LoggerService,
    private router: RouterHelperService
  ) {}

  onSubmit() {
    this.logger.log({
      class: 'LoginComponent',
      method: 'onSubmit',
      message: JSON.stringify(this.model),
      level: LogLevel.Log
    });

    this.authService.signIn(this.model)
        .then(() => this.router.goTo('/dashboard/home'))
        .catch((errMsg: string) => this.errorMessage = 'Mauvais nom d\'utilisateur ou mot de passe');
  }
}
