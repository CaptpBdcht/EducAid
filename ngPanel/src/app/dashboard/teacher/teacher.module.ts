import { NgModule }	from '@angular/core';

import { TeacherComponents } from './teacher.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ TeacherComponents ],
  exports: []
})
export class TeacherModule {}
