import { NgModule }	from '@angular/core';

import { AdminComponents } from './admin.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ AdminComponents ],
  exports: []
})
export class AdminModule {}
