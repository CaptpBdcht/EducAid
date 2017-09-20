import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../../core/services/course.service';
import { ExerciceService } from '../../../../../core/services/exercice.service';
import { ICourse, CourseAdapter } from '../../../../../shared/models/course';
import { IExercice } from '../../../../../shared/models/qcm';

@Component({
    selector: 'educaid-teacher-course-exercices',
    templateUrl: 'teacher-course-exercices.component.html'
})
export class TeacherCourseExercicesComponent implements OnInit, OnDestroy {
  private sub: any;

  course: CourseAdapter;
  courseName: string;

  courseId: number;
  subjectId: number;
  initialSource: IExercice[];
  sourceExercices: IExercice[];
  initialTarget: IExercice[];
  targetExercices: IExercice[];

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
    .then(() => this.initSource())
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

  initSource(): Promise<void> {
    return this.exerciceService.findAllNotInCourseId(this.courseId, this.subjectId)
    .then((exercices: IExercice[]) => this.sourceExercices = exercices as IExercice[])
    .then(() => {});
  }

  initTarget(): void {
    this.exerciceService.findAllInCourseId(this.courseId)
    .then((exercices: IExercice[]) => this.targetExercices = exercices as IExercice[])
    .then(() => this.removeDuplicates());
  }

  removeDuplicates(): void {
    this.targetExercices.forEach(exercice => {
      const duplicate = this.sourceExercices.find(source => source.name === exercice.name);
      const index = this.sourceExercices.indexOf(duplicate);
      if (duplicate) this.sourceExercices.splice(index, 1);
    });

    this.initialSource = [];
    this.sourceExercices.forEach(source => this.initialSource.push(source));
    this.initialTarget = [];
    this.targetExercices.forEach(target => this.initialTarget.push(target));
  }

  saveExercices(): void {
    this.initialSource.forEach(source => {
      const index = this.sourceExercices.indexOf(source); 
      if (index > -1) this.sourceExercices.splice(index, 1);
    });

    this.initialTarget.forEach(target => {
      const index = this.targetExercices.indexOf(target);
      if (index > -1) this.targetExercices.splice(index, 1);
    });

    // Do the job
    this.sourceExercices.forEach(exercice => this.exerciceService.deleteExerciceCourse(exercice.id, this.courseId));
    this.targetExercices.forEach(exercice => this.exerciceService.create(exercice.id, this.courseId));

    // Reinit everythin
    this.initDatas();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
