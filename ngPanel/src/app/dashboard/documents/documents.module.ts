import { NgModule }	from '@angular/core';

import { DocumentsComponents } from './documents.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ DocumentsComponents ],
  exports: []
})
export class DocumentsModule {}
