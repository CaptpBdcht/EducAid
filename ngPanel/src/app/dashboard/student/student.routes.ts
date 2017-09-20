import { EvolutionComponent } from './exercices/evolution.component';
import { ResolveQCMComponent } from './exercices/resolve-qcm.component';
import { StudentComponent } from './student.component';
import { StudentCoursesComponent } from './courses/student-courses.component';

import { StudentGuard } from '../../core/guards/student.guard';

export const StudentRoutes = {
  path: 'student',
  component: StudentComponent,
  canActivate: [ StudentGuard ],
  children: [
    { path: 'mycourses', component: StudentCoursesComponent },
    { path: 'evolution/:courseId', component: EvolutionComponent },
    { path: 'resolveqcm/:classId/:exerciceId', component: ResolveQCMComponent }
  ]
};

export const StudentComponents = [
  EvolutionComponent,
  ResolveQCMComponent,
  StudentComponent,
  StudentCoursesComponent
];
