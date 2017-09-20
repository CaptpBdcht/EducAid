import { TeacherComponent } from './teacher.component';

// CRUD
import { ClassesCrudComponent } from './cruds/classes-crud.component';
import { CoursesCrudComponent } from './cruds/courses-crud.component';
// Classes
import { TeacherClassesComponent } from './my/classes/teacher-classes.component';
import { TeacherClassStudentsComponent } from './my/classes/teacher-class-students.component';
// Courses
import { TeacherCoursesComponent } from './my/courses/teacher-courses.component';

import { TeacherCourseExercicesDetailComponent } from 
'./my/courses/exercices/teacher-course-exercices-detail.component';
import { TeacherCourseExercicesComponent } from './my/courses/exercices/teacher-course-exercices.component';

import { TeacherCourseDocumentsDetailComponent } from 
'./my/courses/documents/teacher-course-documents-detail.component';
import { TeacherCourseDocumentsComponent } from './my/courses/documents/teacher-course-documents.component';

import { TeacherGuard } from '../../core/guards/teacher.guard';

export const TeacherRoutes = {
  path: 'teacher',
  component: TeacherComponent,
  canActivate: [ TeacherGuard ],
  children: [
    { path: 'classes', component: ClassesCrudComponent },
    { path: 'courses', component: CoursesCrudComponent },
    { path: 'myclasses', component: TeacherClassesComponent },
    { path: 'myclasses/assign/:id', component: TeacherClassStudentsComponent },
    { path: 'mycourses', component: TeacherCoursesComponent },
    { path: 'mycourses/detail/exercices/:courseId/:subjectId', component: TeacherCourseExercicesDetailComponent },
    { path: 'mycourses/assign/exercices/:courseId/:subjectId', component: TeacherCourseExercicesComponent },
    { path: 'mycourses/detail/documents/:courseId/:subjectId', component: TeacherCourseDocumentsDetailComponent },
    { path: 'mycourses/assign/documents/:courseId/:subjectId', component: TeacherCourseDocumentsComponent }
  ]
};

export const TeacherComponents = [
  TeacherComponent,
  // Class & Course crud
  ClassesCrudComponent,
  CoursesCrudComponent,
  // Teacher own management
  TeacherClassesComponent,
  TeacherClassStudentsComponent,
  TeacherCoursesComponent,
  TeacherCourseExercicesDetailComponent,
  TeacherCourseExercicesComponent,
  TeacherCourseDocumentsDetailComponent,
  TeacherCourseDocumentsComponent
];
