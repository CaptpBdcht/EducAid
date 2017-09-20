import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { QCMQuestionComponent } from './qcm-question.component';

import {
  PanelModule,
  SelectButtonModule
} from 'primeng/primeng';

@NgModule({
  imports: [ 
    FormsModule,
    PanelModule,
    SelectButtonModule
  ],
  exports: [ QCMQuestionComponent ],
  declarations: [ QCMQuestionComponent ],
  providers: []
})
export class MakersModule {}
