import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../../core/services/course.service';
import { DocumentService } from '../../../../../core/services/document.service';
import { CourseHasDocumentService } from '../../../../../core/services/course-has-document.service';
import { ICourse, CourseAdapter } from '../../../../../shared/models/course';
import { IDocument } from '../../../../../shared/models/document';

@Component({
    selector: 'educaid-teacher-course-documents',
    templateUrl: 'teacher-course-documents.component.html'
})
export class TeacherCourseDocumentsComponent implements OnInit, OnDestroy {
  private sub: any;

  course: CourseAdapter;
  courseName: string;

  courseId: number;
  subjectId: number;
  initialSource: IDocument[];
  sourceDocuments: IDocument[];
  initialTarget: IDocument[];
  targetDocuments: IDocument[];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private courseHasDocumentService: CourseHasDocumentService,
    private documentService: DocumentService
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
    console.warn(this.sourceDocuments);
    console.warn(this.targetDocuments);
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
    return this.documentService.findAllNotInCourseId(this.courseId, this.subjectId)
    .then((documents: IDocument[]) => {
      this.sourceDocuments = documents as IDocument[];
    })
    .then(() => {});
  }

  initTarget(): void {
    this.documentService.findAllInCourseId(this.courseId)
    .then((documents: IDocument[]) => {
      this.targetDocuments = documents as IDocument[];
    })
    .then(() => this.removeDuplicates());
  }

  removeDuplicates(): void {
    this.targetDocuments.forEach(document => {
      const duplicate = this.sourceDocuments.find(source => source.name === document.name);
      const index = this.sourceDocuments.indexOf(duplicate);
      if (duplicate) this.sourceDocuments.splice(index, 1);
    });

    this.initialSource = [];
    this.sourceDocuments.forEach(source => this.initialSource.push(source));
    this.initialTarget = [];
    this.targetDocuments.forEach(target => this.initialTarget.push(target));
  }

  saveExercices(): void {
    this.initialSource.forEach(source => {
      const index = this.sourceDocuments.indexOf(source); 
      if (index > -1) this.sourceDocuments.splice(index, 1);
    });

    this.initialTarget.forEach(target => {
      const index = this.targetDocuments.indexOf(target);
      if (index > -1) this.targetDocuments.splice(index, 1);
    });

    // Do the job
    this.sourceDocuments.forEach(document => 
    this.courseHasDocumentService.deleteDocumentCourse(document.id, this.courseId));
    this.targetDocuments.forEach(document => 
    this.courseHasDocumentService.create(this.courseId, document.id));

    // Reinit everythin
    this.initDatas();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
