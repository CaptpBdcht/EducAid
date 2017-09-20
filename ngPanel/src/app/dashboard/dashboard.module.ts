import { NgModule }	from '@angular/core';

import { AdminModule } from './admin/admin.module';
import { DocumentsModule } from './documents/documents.module';
import { HelpingModule } from './helping/helping.module';
import { MakersModule } from './makers/makers.module';
import { MyPictureModule } from './my-picture/my-picture.module';
import { ProfileModule } from './profile/profile.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

import { DashboardComponents } from './dashboard.routes';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    AdminModule,
    DocumentsModule,
    HelpingModule,
    MakersModule,
    MyPictureModule,
    ProfileModule,
    SharedModule,
    StudentModule,
    TeacherModule
  ],
  declarations: [ DashboardComponents ],
  exports: []
})
export class DashboardModule {}
