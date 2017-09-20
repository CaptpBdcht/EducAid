import { NgModule, Optional, SkipSelf }	from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HelpingGuard } from './guards/helping.guard';
import { MyPictureGuard } from './guards/my-picture.guard';
import { ProfileGuard } from './guards/profile.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { StudentGuard } from './guards/student.guard';

import { ApiRequesterService } from './metadatas/api-requester.service';
import { AuthenticationService } from './metadatas/authentication.service';
import { RouterHelperService } from './metadatas/router-helper.service';

import { ClassService } from './services/class.service';
import { CourseService } from './services/course.service';
import { CourseHasDocumentService } from './services/course-has-document.service';
import { DocumentService } from './services/document.service';
import { ExerciceService } from './services/exercice.service';
import { HelpRequestService } from './services/help-request.service';
import { LevelService } from './services/level.service';
import { LevelHasSpecialtyService } from './services/level-has-specialty.service';
import { QCMService } from './services/qcm.service';
import { SpecialtyService } from './services/specialty.service';
import { StudentService } from './services/student.service';
import { StudentExerciceService } from './services/student-exercice.service';
import { SubjectService } from './services/subject.service';
import { TeacherService } from './services/teacher.service';  
import { UserService }  from './services/user.service';

import { LoggerService } from './logs/logger.service';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    ConfirmationService,
    // Guards
    AdminGuard,
    AuthenticationGuard,
    HelpingGuard,
    MyPictureGuard,
    ProfileGuard,
    TeacherGuard,
    StudentGuard,
    // Necessary
    ApiRequesterService,
    AuthenticationService,
    LoggerService,
    RouterHelperService,
    // Services
    ClassService,
    CourseService,
    CourseHasDocumentService,
    DocumentService,
    ExerciceService,
    HelpRequestService,
    LevelService,
    LevelHasSpecialtyService,
    QCMService,
    SpecialtyService,
    StudentService,
    StudentExerciceService,
    SubjectService,
    TeacherService,
    UserService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
