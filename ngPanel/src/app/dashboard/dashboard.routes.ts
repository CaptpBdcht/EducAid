import { AdminRoutes } from './admin/admin.routes';

import { DocumentsRoutes } from './documents/documents.routes';
import { HelpingRoutes } from './helping/helping.routes';
import { MakersRoutes } from './makers/makers.routes';
import { MyPictureRoutes } from './my-picture/my-picture.routes';
import { ProfileRoutes } from './profile/profile.routes';
import { StudentRoutes } from './student/student.routes';
import { TeacherRoutes } from './teacher/teacher.routes';

import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';

import { AuthenticationGuard } from '../core/guards/authentication.guard';

export const DashboardRoutes = {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [ AuthenticationGuard ],
  children: [
    { path: 'home', component: HomeComponent },
    AdminRoutes,
    DocumentsRoutes,
    HelpingRoutes,
    MakersRoutes,
    MyPictureRoutes,
    ProfileRoutes,
    StudentRoutes,
    TeacherRoutes
  ]
};

export const DashboardComponents = [
  DashboardComponent,
  HomeComponent
];
