import { Component, OnInit } from '@angular/core';

import { plainToClass } from 'class-transformer';

import { SelectItem } from 'primeng/primeng';

import { ClassService } from '../../../core/services/class.service';
import { CourseService } from '../../../core/services/course.service';
import { SubjectService } from '../../../core/services/subject.service';
import { UserService } from '../../../core/services/user.service';

import { IClass, ClassAdapter } from '../../../shared/models/class';
import { ICourse, CourseAdapter } from '../../../shared/models/course';
import { ISubject } from '../../../shared/models/subject';
import { IUser } from '../../../shared/models/user';

@Component({
    selector: 'educaid-teacher-courses-crud',
    templateUrl: 'courses-crud.component.html'
})
export class CoursesCrudComponent implements OnInit {

  displayDialog: boolean;

  course: ICourse = new CourseAdapter();
  
  selectedCourse: ICourse;

  newCourse: boolean;

  courses: ICourse[];

  classList: IClass[];
  subjectList: ISubject[];
  teacherList: IUser[];

  classes: SelectItem[];
  subjects: SelectItem[];
  teachers: SelectItem[];

  selectedClass: string;
  selectedSubject: string;
  selectedTeacher: string;

  constructor(
    private classService: ClassService,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private userService: UserService
  ) {
    this.userService.findAllTeachers()
    .then((teachers: IUser[]) => this.initTeachers(teachers))
    .then(() => this.subjectService.findAll())
    .then((subjects: ISubject[]) => this.initSubjects(subjects))
    .then(() => this.classService.findAllFormatted())
    .then((classes: IClass[]) => this.initClasses(classes));
  }

  initTeachers(teachers: IUser[]): void {
    this.teachers = [];
    this.teacherList = teachers;
    teachers.forEach(teacher => this.teachers.push({
      label: teacher.firstname + ' ' + teacher.lastname,
      value: teacher.id
    })); 
  }

  initSubjects(subjects: ISubject[]): void {
    this.subjects = [];
    this.subjectList = subjects;
    subjects.forEach(subject => this.subjects.push({ label: subject.name, value: subject.id }));
  }

  initClasses(classes: IClass[]): void {
    this.classes = [];
    this.classList = classes;
    classes.forEach(clazz => {
      clazz = plainToClass(ClassAdapter, clazz);
      clazz.init();
      this.classes.push({
        label: (clazz as ClassAdapter).name,
        value: clazz.id
      });
    });
  }

  ngOnInit(): void {
    this.courseService.findAllFormatted()
    .then((courses: ICourse[]) => this.courses = courses as CourseAdapter[]);
  }

  showAddCourseDialog(): void {
    this.newCourse = true;
    this.course = new CourseAdapter();
    this.displayDialog = true;
  }

  save(): void {
    const courses = this.courses ? [...this.courses] : [];

    // Add
    if (this.newCourse) {
      this.course.classId = this.classList.find(
        clazz => clazz.id === this.course.classId
      ).id;

      this.course.subjectId = this.subjectList.find(
        subject => subject.id === this.course.subjectId
      ).id;

      this.course.teacherId = this.teacherList.find(
        teacher => teacher.id === this.course.teacherId
      ).id;

      courses.push(this.course);
      this.courseService.create(this.course)
          .then(() => this.reinitCourseDialog());
    }
    // Update
    else {
      courses[this.findSelectedCourseIndex()] = this.course;
      
      this.courseService.update(this.course)
          .then(() => this.reinitCourseDialog());
    }
  }

  reinitCourseDialog(): void {
    this.course = null;
    this.selectedCourse = null;
    this.displayDialog = false;
    this.ngOnInit();
  }

  delete(): void {
    const index = this.findSelectedCourseIndex();
    this.courseService.delete(this.courses[index].id);
    this.courses = this.courses.filter((val, i) => i !== index);
    this.course = null;
    this.displayDialog = false;
  }

  onRowSelect(event: any): void {
    this.newCourse = false;
    this.course = this.cloneCourse(event.data);
    this.course.teacherId = event.data.userId;
    this.displayDialog = true;
  }

  cloneCourse(data: any): ICourse {
    return new CourseAdapter(
      data.id, data.classId, data.subjectId, data.teacherId,
      data.userFirstname, data.userLastname,
      data.subjectName, data.levelName, data.specialtyName, data.year);
  }

  findSelectedCourseIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }
}
