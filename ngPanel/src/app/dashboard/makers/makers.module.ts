import { NgModule }	from '@angular/core';

import { MakersComponents } from './makers.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ MakersComponents ],
  exports: []
})
export class MakersModule {}
