export interface ICourse {
  id: number;
  classId: number;
  subjectId: number;
  teacherId: number;
}

export class CourseAdapter implements ICourse {
  id: number;
  classId: number;
  subjectId: number;
  teacherId: number;
  className: string;
  userFirstname: string;
  userLastname: string;
  subjectName: string;
  levelName: string;
  specialtyName: string;
  year: string;

  constructor(
    id?: number,
    classId?: number,
    subjectId?: number,
    teacherId?: number,
    className?: string,
    userFirstname?: string,
    userLastname?: string,
    subjectName?: string,
    levelName?: string,
    specialtyName?: string,
    year?: string
  ) {
    this.id = id;
    this.classId = classId;
    this.subjectId = subjectId;
    this.teacherId = teacherId;
    this.className = this.formatClassName();
    this.userFirstname = userFirstname;
    this.userLastname = userLastname;
    this.subjectName = subjectName;
    this.levelName = levelName;
    this.specialtyName = specialtyName;
    this.year = year;
  }
  formatClassName(): string {
    if (this.specialtyName === null){
      return this.levelName+' ('+this.year+')';
    }
    return this.levelName+' '+this.specialtyName+' ('+this.year+')';
  }

  init(){
    this.className = this.formatClassName();
  }

}

export class CourseDTO implements ICourse {
  id: number;
  classId: number;
  subjectId: number;
  teacherId: number;

  constructor(
    id?: number,
    classId?: number,
    subjectId?: number,
    teacherId?: number
  ) {
    this.id = id;
    this.classId = classId;
    this.subjectId = subjectId;
    this.teacherId = teacherId;
  }
}

/*export class Course {
  static fromJSONArray(array: Array<any>): Course[] {
    return array.map(obj => new Course(obj.id, obj.class_id, obj.subject_id, obj.teacher_id));
  }

  constructor(
    public id: number,
    public classId: number,
    public subjectId: number,
    public teacherId: number
  ) {}
}*/
