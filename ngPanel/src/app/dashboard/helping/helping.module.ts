import { NgModule }	from '@angular/core';

import { HelpingComponents } from './helping.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ HelpingComponents ],
  exports: []
})
export class HelpingModule {}
