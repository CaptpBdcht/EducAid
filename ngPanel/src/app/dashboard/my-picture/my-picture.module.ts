import { NgModule }	from '@angular/core';

import { MyPictureComponents } from './my-picture.routes';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ MyPictureComponents ],
  exports: []
})
export class MyPictureModule {}
