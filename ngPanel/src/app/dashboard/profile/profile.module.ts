import { NgModule }	from '@angular/core';

import { ProfileComponents } from './profile.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ ProfileComponents ],
  exports: []
})
export class ProfileModule {}
