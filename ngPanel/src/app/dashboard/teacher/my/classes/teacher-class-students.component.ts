import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassService } from '../../../../core/services/class.service';
import { StudentService } from '../../../../core/services/student.service';
import { UserService } from '../../../../core/services/user.service';
import { IClass, ClassAdapter } from '../../../../shared/models/class';
import { IUser, IStudent, StudentDTO } from '../../../../shared/models/user';

@Component({
    selector: 'educaid-teacher-class-students',
    templateUrl: 'teacher-class-students.component.html'
})
export class TeacherClassStudentsComponent implements OnInit, OnDestroy {
  private sub: any;

  clazz: ClassAdapter;
  className: string;

  classId: number;
  initialSource: IUser[];
  sourceStudents: IUser[];
  initialTarget: StudentDTO[];
  targetStudents: StudentDTO[];

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.classId = +params['id'];
       this.initDatas();
    });
  }

  initDatas(): void {
    this.initClass()
    .then(() => this.initSource())
    .then(() => this.initTarget(this.classId));
  }

  initClass(): Promise<void> {
    return this.classService.findFormattedByClassId(this.classId)
    .then((clazz: IClass[]) => this.formatClass(clazz));
  }

  formatClass(clazz: IClass[]): void {
    this.clazz = clazz[0] as ClassAdapter;
    this.className = this.clazz.level + ' '
                   + (this.clazz.specialty ? (this.clazz.specialty + ' ') : '')
                   + this.clazz.year;
  }

  initSource(): Promise<void> {
    return this.userService.findAllStudents()
    .then((students: IUser[]) => this.sourceStudents = students as IUser[])
    .then(() => {});
  }

  initTarget(id: number): void {
    this.studentService.findAllByClassId(id)
    .then((students: IStudent[]) => this.targetStudents = students as StudentDTO[])
    .then(() => this.removeDuplicates());
  }

  removeDuplicates(): void {
    this.targetStudents.forEach(student => {
      const duplicate = this.sourceStudents.find(user => user.username === student.username);
      const index = this.sourceStudents.indexOf(duplicate);
      if (duplicate) this.sourceStudents.splice(index, 1);
    });

    this.initialSource = [];
    this.sourceStudents.forEach(source => this.initialSource.push(source));
    this.initialTarget = [];
    this.targetStudents.forEach(target => this.initialTarget.push(target));
  }

  saveStudents(): void {
    this.initialSource.forEach(source => {
      const index = this.sourceStudents.indexOf(source); 
      if (index > -1) this.sourceStudents.splice(index, 1);
    });

    this.initialTarget.forEach(target => {
      const index = this.targetStudents.indexOf(target);
      if (index > -1) this.targetStudents.splice(index, 1);
    });

    // Do the job
    this.sourceStudents.forEach(student => this.studentService.delete(student.id, this.classId));
    this.targetStudents.forEach(student => this.studentService.create(student.id, this.classId));

    // Reinit everythin
    this.initDatas();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
