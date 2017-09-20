import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../../core/services/course.service';
import { ExerciceService } from '../../../core/services/exercice.service';
import { RouterHelperService } from '../../../core/metadatas/router-helper.service';
import { ICourse } from '../../../shared/models/course';
import { IExercice } from '../../../shared/models/qcm';

@Component({
  selector: 'educaid-student-courses',
  templateUrl: 'student-courses.component.html'
})

export class StudentCoursesComponent implements OnInit {

  studentCourses: ICourse[];

  selectedCourse: ICourse;
  courseExercices: IExercice[];

  constructor(
    private courseService: CourseService,
    private exerciceService: ExerciceService,
    private routerHelperService: RouterHelperService
  ) { }

  ngOnInit() {
    this.courseService.findAllFormattedByClassUserId()
    .then((courses: ICourse[]) => this.studentCourses = courses)
    .catch((error: string) => console.error(error));
  }

  selectCourse(course: ICourse): void {
    this.selectedCourse = course;
    this.exerciceService.findAllByCourseId(course.id)
    .then((exercices: IExercice[]) => this.courseExercices = exercices);
  }

  selectEvolution(course: ICourse): void {
    this.routerHelperService.goTo(
      '/dashboard/student/evolution',
      course.id
    );
  }

  selectExercice(exercice: IExercice): void {
    this.routerHelperService.goTo(
      '/dashboard/student/resolveqcm',
      this.selectedCourse.classId,
      exercice.id
    );
  }

  getFormattedMark(exercice: any): string {
    if (exercice.mark == null || exercice.maxMark == null) return '???';
    else return exercice.mark + '/' + exercice.maxMark;
  }

  getFormattedLastMark(exercice: any): string {
    if (exercice.lastMark == null || exercice.maxMark == null) return '???';
    else return exercice.lastMark + '/' + exercice.maxMark;
  }
}
