import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../../../core/services/course.service';
import { RouterHelperService } from '../../../../core/metadatas/router-helper.service';

import { ICourse, CourseAdapter } from '../../../../shared/models/course';

@Component({
    selector: 'educaid-teacher-courses',
    templateUrl: 'teacher-courses.component.html'
})
export class TeacherCoursesComponent implements OnInit {
  
  courses: ICourse[];

  constructor(
    private courseService: CourseService,
    private routerHelperService: RouterHelperService
  ) {}

  ngOnInit(): void {
    this.courseService.findAllFormattedByTeacherId()
    .then((courses: ICourse[]) => this.courses = courses as CourseAdapter[]);
  }

  selectSearchCourseExercice(course: any): void {
    this.routerHelperService.goTo('/dashboard/teacher/mycourses/detail/exercices', course.courseId, course.subId);
  }

  selectCourseExercice(course: any): void {
    this.routerHelperService.goTo('/dashboard/teacher/mycourses/assign/exercices', course.courseId, course.subId);
  }

  selectSearchCourseDocument(course: any): void {
    this.routerHelperService.goTo('/dashboard/teacher/mycourses/detail/documents', course.courseId, course.subId);
  }

  selectCourseDocument(course: any): void {
    this.routerHelperService.goTo('/dashboard/teacher/mycourses/assign/documents', course.courseId, course.subId);
  }
}
