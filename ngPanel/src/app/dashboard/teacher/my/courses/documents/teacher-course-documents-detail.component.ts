import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../../core/services/course.service';
import { DocumentService } from '../../../../../core/services/document.service';
import { ICourse, CourseAdapter } from '../../../../../shared/models/course';
import { IDocument } from '../../../../../shared/models/document';

@Component({
  selector: 'educaid-teacher-course-detail',
  templateUrl: 'teacher-course-documents-detail.component.html'
})

export class TeacherCourseDocumentsDetailComponent implements OnInit, OnDestroy {
  private sub: any;

  displayDialog: boolean;

  document: IDocument;
  documents: IDocument[] = [];
  selectedExercice: string;

  courseId: number;
  subjectId: number;
  
  course: CourseAdapter;
  courseName: string;
  
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
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
    this.documentService.findAllInCourseId(this.courseId)
    .then((documents: IDocument[]) => this.documents = documents)
    .then(() => console.warn(this.documents));
  }

  deleteDocument(document: IDocument): void {
    this.documentService.delete(document.id, document.URL)
    .then(() => this.initTarget())
    .catch((error: string) => console.error(error));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
