import { NgModule }	from '@angular/core';

import { StudentComponents } from './student.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ StudentComponents ],
  exports: []
})
export class StudentModule {}
