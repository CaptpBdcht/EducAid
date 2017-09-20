import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../../core/services/course.service';
import { ExerciceService } from '../../../../../core/services/exercice.service';
import { ICourse, CourseAdapter } from '../../../../../shared/models/course';
import { IExercice } from '../../../../../shared/models/qcm';

@Component({
  selector: 'educaid-teacher-course-detail',
  templateUrl: 'teacher-course-exercices-detail.component.html'
})

export class TeacherCourseExercicesDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  exercices: IExercice[] = [];
  selectedExercice: string;

  courseId: number;
  subjectId: number;
  
  course: CourseAdapter;
  courseName: string;
  
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private exerciceService: ExerciceService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.courseId = +params['courseId'];
      this.subjectId = +params['subjectId'];
      this.initDatas();
    });
  }

  initDatas(): void {
    this.initCourse()
    .then(() => this.initTarget());
  }

  initCourse(): Promise<void> {
    return this.courseService.findFormattedByCourseId(this.courseId)
    .then((course: ICourse[]) => this.formatClass(course));
  }

  formatClass(course: ICourse[]): void {
    this.course = course[0] as CourseAdapter;
    this.courseName = this.course.subjectName + ' - '
                    + this.course.levelName;
    if (this.course.specialtyName !== undefined)
      this.courseName += ' ' + this.course.specialtyName;
  }

  initTarget(): void {
    this.exerciceService.findAllInCourseId(this.courseId)
    .then((exercices: IExercice[]) => this.exercices = exercices)
    .then(() => console.warn(this.exercices));
  }

  deleteExercice(exercice: IExercice): void {
    this.exerciceService.delete(exercice.id)
    .then(() => this.ngOnInit())
    .catch((error: string) => console.error(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
