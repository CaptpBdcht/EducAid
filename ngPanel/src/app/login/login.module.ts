import { NgModule }	from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginComponents } from './login.routes';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ LoginComponents ],
  exports: []
})
export class LoginModule {}
